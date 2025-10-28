import axios from "./axios";

const getBinaryTreeData = (user) => {
  return axios.get(
    `/referral/binary-tree/${user?.user?.userId}?email=${user?.user?.email}`
  );
};

const getReferralData = (user) => {
  return axios.get(
    `/referral/referrer/${user?.user?.userId}?email=${user?.user?.email}`
  );
};

const getBinaryTreeDataById = (id) => {
  return axios.get(`referral/binary-tree-admin/${id}`);
};

const genealogyService = {
  getBinaryTreeData,
  getReferralData,
  getBinaryTreeDataById,
};
export default genealogyService;
