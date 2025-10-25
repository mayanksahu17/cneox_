const packageService = require("../services/packages_master_service");

module.exports = {
  createPackage: async (req, res, next) => {
    try {
      const packageData = req.body;
      const createdPackage = await packageService.createPackage(packageData);
      if (createdPackage) {
        res.status(200).json({ data: createdPackage, success: true });
      } else {
        res
          .status(500)
          .json({ message: "Failed to create package", success: false });
      }
    } catch (error) {
      console.log("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  getPackageById: async (req, res, next) => {
    try {
      const packageId = req.params.packageId;
      const packageData = await packageService.getPackageById(packageId);
      if (packageData) {
        res.status(200).json({ data: packageData, success: true });
      } else {
        res.status(404).json({ message: "Package not found", success: false });
      }
    } catch (error) {
      console.log("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  geAlltPackage: async (req, res, next) => {
    try {
      const packageData = await packageService.geAlltPackage();
      if (packageData) {
        res.status(200).json({ data: packageData, success: true });
      } else {
        res.status(404).json({ message: "Package not found", success: false });
      }
    } catch (error) {
      console.log("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  updatePackageById: async (req, res, next) => {
    try {
      const packageId = req.params.packageId;
      const packageData = req.body;
      const updateResult = await packageService.updatePackageById(
        packageId,
        packageData
      );
      if (updateResult.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "Package updated successfully", success: true });
      } else {
        res.status(404).json({ message: "Package not found", success: false });
      }
    } catch (error) {
      console.log("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
  deletePackageById: async (req, res, next) => {
    try {
      const packageId = req.params.packageId;
      const deleteResult = await packageService.deletePackageById(packageId);
      if (deleteResult.affectedRows > 0) {
        res
          .status(200)
          .json({ message: "Package deleted successfully", success: true });
      } else {
        res.status(404).json({ message: "Package not found", success: false });
      }
    } catch (error) {
      console.log("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  },
};
