import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { 
  FaUsers, 
  FaHospitalUser, 
  FaEnvelope, 
  FaShieldAlt, 
  FaTrashAlt, 
  FaFilter 
} from 'react-icons/fa';
import { RiUserHeartFill } from "react-icons/ri";
import '../styles/usersPage.css';
import LoadComponents from '../../components/componentsLoadScreen/LoadComponents';

const VITE_BASEURL = import.meta.env.VITE_BASEURL;

const UsersPage = () => {
  const token = useSelector((state) => state.token);
  const [donors, setDonors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${VITE_BASEURL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonors(res?.data?.data?.donors || []);
      setHospitals(res?.data?.data?.hospitals || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load platform registry data");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      const ress = await axios.delete(`${VITE_BASEURL}/admin/delete/${deletingUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteModalVisible(false);
      getUsers();
      toast.success(ress?.data?.message || "Account purged successfully");
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error(err?.response?.data?.message || "Purge request denied");
    }
  };

  const showDeleteModal = (userId) => {
    setDeletingUserId(userId);
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setDeletingUserId(null);
  };

  useEffect(() => {
    getUsers();
  }, [token]);

  const combinedUsers = [
    ...hospitals.map((h) => ({ ...h, userType: 'hospital' })),
    ...donors.map((d) => ({ ...d, userType: 'donor' })),
  ];

  const filteredUsers = filterType === 'all'
    ? combinedUsers
    : combinedUsers.filter((user) => user.userType === filterType);

  if (loading) {
    return <LoadComponents />;
  }

  return (
    <div className="users-page-container">
      {/* Dynamic System Analytics Banner */}
      <div className="dashboard-metric-strip">
        <div className="metric-card-node">
          <div className="metric-icon-frame total-node"><FaUsers /></div>
          <div className="metric-data-block">
            <h3>{combinedUsers.length}</h3>
            <p>Total Registered</p>
          </div>
        </div>
        <div className="metric-card-node">
          <div className="metric-icon-frame donor-node"><RiUserHeartFill /></div>
          <div className="metric-data-block">
            <h3>{donors.length}</h3>
            <p>Active Donors</p>
          </div>
        </div>
        <div className="metric-card-node">
          <div className="metric-icon-frame hospital-node"><FaHospitalUser /></div>
          <div className="metric-data-block">
            <h3>{hospitals.length}</h3>
            <p>Hospitals Connected</p>
          </div>
        </div>
      </div>

      {/* Control Navigation Header */}
      <div className="registry-control-header">
        <div className="header-title-set">
          <h1>Platform Registries</h1>
          <p>Monitor and manage network database accounts</p>
        </div>

        <div className="filter-navigation-tabs">
          <span className="filter-descriptor"><FaFilter /> Filter By:</span>
          <button
            className={`filter-pill-btn ${filterType === 'all' ? 'active-pill' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Accounts
          </button>
          <button
            className={`filter-pill-btn ${filterType === 'donor' ? 'active-pill' : ''}`}
            onClick={() => setFilterType('donor')}
          >
            Donors
          </button>
          <button
            className={`filter-pill-btn ${filterType === 'hospital' ? 'active-pill' : ''}`}
            onClick={() => setFilterType('hospital')}
          >
            Hospitals
          </button>
        </div>
      </div>

      {/* Main Grid View Container */}
      {filteredUsers.length === 0 ? (
        <div className="empty-registry-canvas">
          <p>No account matches found matching selected classification</p>
        </div>
      ) : (
        <div className="users-responsive-matrix">
          {filteredUsers.map((user) => (
            <div key={user._id} className="modern-user-card-block">
              {/* Card Accent Top Line Badge */}
              <span className={`type-ribbon-badge ${user.userType === 'hospital' ? 'ribbon-hospital' : 'ribbon-donor'}`}>
                {user.userType.toUpperCase()}
              </span>

              <div className="card-profile-section">
                <div className={`avatar-placeholder ${user.userType === 'hospital' ? 'hosp-avatar' : 'donor-avatar'}`}>
                  {user.userType === 'hospital' ? <FaHospitalUser /> : <RiUserHeartFill />}
                </div>
                <div className="profile-identity-info">
                  <h3>{user.fullName || user.hospitalName || "Anonymous User"}</h3>
                  <div className="status-badge-inline">
                    <span className={`status-pill ${user.status?.toLowerCase() === 'active' ? 'status-green' : 'status-slate'}`}>
                      <span className="pulsing-dot"></span> {user.status || "Active"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="account-meta-details-stack">
                <div className="meta-data-row">
                  <FaEnvelope className="meta-row-icon" />
                  <span className="meta-row-text" title={user.email}>{user.email || "N/A"}</span>
                </div>
                <div className="meta-data-row">
                  <FaShieldAlt className="meta-row-icon" />
                  <span className="meta-row-text compact-id-code">ID: {user._id}</span>
                </div>
              </div>

              <div className="card-action-footer-tier">
                <Button 
                  danger 
                  type="primary"
                  className="purge-account-btn"
                  icon={<FaTrashAlt />}
                  onClick={() => showDeleteModal(user._id)}
                >
                  Terminate Account
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Styled Modern Delete Modal Overlay */}
      <Modal
        title={null}
        open={deleteModalVisible}
        onOk={deleteUser}
        onCancel={hideDeleteModal}
        okText="Confirm Deletion"
        cancelText="Cancel"
        centered
        className="modern-admin-modal"
        okButtonProps={{ danger: true, type: 'primary' }}
      >
        <div className="modal-alert-graphic">
          <FaTrashAlt />
        </div>
        <h2 className="modal-danger-heading">Confirm System Purge</h2>
        <p className="modal-danger-body">
          Are you certain you want to remove this account profile from production storage structures? This operation cannot be reversed.
        </p>
      </Modal>
    </div>
  );
};

export default UsersPage;