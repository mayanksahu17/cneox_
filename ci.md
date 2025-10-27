# 1) go to frontend repo
cd ~/cneox_/f.cneox

# 2) fetch latest changes from origin (adjust branch if needed)
git fetch --all
git checkout main        # or the branch you deploy from
git pull origin main

# 3) install dependencies (only if package.json changed)
npm ci                  # faster and deterministic; use `npm install` if you prefer

# 4) build
npm run build

# 5) create new publish folder and copy dist there (atomic swap)
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
mkdir -p /tmp/cneox_frontend_${TIMESTAMP}
cp -r dist/* /tmp/cneox_frontend_${TIMESTAMP}/

# 6) backup current site (optional)
sudo tar -czf ~/deploy_backups/cneox_frontend_backup_${TIMESTAMP}.tar.gz -C /var/www cneox_frontend || true

# 7) swap folders atomically
sudo chown -R www-data:www-data /tmp/cneox_frontend_${TIMESTAMP}
sudo chmod -R 755 /tmp/cneox_frontend_${TIMESTAMP}
# move old to .old and put new in place
sudo mv /var/www/cneox_frontend /var/www/cneox_frontend_old_${TIMESTAMP} 2>/dev/null || true
sudo mv /tmp/cneox_frontend_${TIMESTAMP} /var/www/cneox_frontend

# 8) ensure perms
sudo chown -R www-data:www-data /var/www/cneox_frontend
sudo find /var/www/cneox_frontend -type d -exec chmod 755 {} \;
sudo find /var/www/cneox_frontend -type f -exec chmod 644 {} \;

# 9) reload nginx (no downtime)
sudo nginx -t && sudo systemctl reload nginx

# 10) sanity check
curl -I http://127.0.0.1/ | head -n 5
