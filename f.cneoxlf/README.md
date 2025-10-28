# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# azzle
# azzle-ai
# azzle-ai



# ssh into the server 
    ssh root@66.29.136.199

enter the password : 

cd /var/www/crown-frontend

# 1. Pull latest changes
git pull origin main  # or replace 'main' with your branch

# 2. Install any updated dependencies
npm install

# 3. Build the production frontend
npm run build

# 4. (Optional but recommended) Force browser to fetch latest index.html
touch dist/index.html

# 5. Reload NGINX to ensure all changes are served
sudo nginx -t
sudo systemctl reload nginx

# pull latest changes for  backend 

cd ~/crown-backend

git pull 

pm2  restart crown-backend-dev  

pm2 save 

