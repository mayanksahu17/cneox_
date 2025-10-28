import axios from "./axios";

const getBinaryTreeData = (user) => {
  return axios.get(
    `/referral/binary-tree/${user?.user?.userId}?email=${user?.user?.email}`
  );
};

const getReferralData = (user) => {
  return axios.get(`/referral/referrer?email=${user?.user?.email}`);
};

const getBinaryTreeDataById = (id, user) => {
  return axios.get(`/referral/binary-tree/${id}?email=${user?.user?.email}`);
};

const genealogyService = {
  getBinaryTreeData,
  getReferralData,
  getBinaryTreeDataById,
};
export default genealogyService;
