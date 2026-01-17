import React, { useEffect, useState } from 'react';
import { Modal, Button, message } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../styles/usersPage.css';
import LoadComponents from '../../components/componentsLoadScreen/LoadComponents';
import { toast } from 'sonner';

const Base_Url = import.meta.env.VITE_BASEURL;

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
      const res = await axios.get(`${Base_Url}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonors(res?.data?.data?.donors || []);
      setHospitals(res?.data?.data?.hospitals || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      const ress = await axios.delete(`${Base_Url}/admin/delete/${deletingUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteModalVisible(false);
      getUsers();
      toast.error(ress?.data?.message)
    } catch (err) {
      console.error("Error deleting user:", err);
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
    <div className="users-page">
      <h1>Users List (Donors and Hospitals)</h1>

      <div className="filter-buttons">
        <button
          className={filterType === 'all' ? 'active' : ''}
          onClick={() => setFilterType('all')}
        >
          All
        </button>
        <button
          className={filterType === 'donor' ? 'active' : ''}
          onClick={() => setFilterType('donor')}
        >
          Donors
        </button>
        <button
          className={filterType === 'hospital' ? 'active' : ''}
          onClick={() => setFilterType('hospital')}
        >
          Hospitals
        </button>
      </div>

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="users-list">
          {filteredUsers.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{user.fullName || user.hospitalName || "Unknown User"}</h3>
              <p>Email: {user.email || "N/A"}</p>
              <p>Status: {user.status || "N/A"}</p>
              <p>Type: {user.userType}</p>
              <Button
                type="danger"
                onClick={() => showDeleteModal(user._id)}
              >
                Delete User
              </Button>
            </div>
          ))}
        </div>
      )}


      <Modal
        title="Confirm Deletion"
        open={deleteModalVisible}
        onOk={deleteUser}
        onCancel={hideDeleteModal}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default UsersPage;
