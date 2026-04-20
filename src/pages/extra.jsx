{/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar-section">
          <div className="avatar-container">
            {user.avatar ? (
              <img src={user.avatar} alt={user.fullname} className="profile-avatar" />
            ) : (
              <div className="avatar-placeholder">{initials}</div>
            )}
            {!editMode && (
              <label className="avatar-upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
                <span className="edit-avatar-btn">📷</span>
              </label>
            )}
          </div>
        </div>

        <div className="profile-info">
          {editMode ? (
            <div className="edit-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullname"
                  value={editData.fullname}
                  onChange={handleEditInputChange}
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={editData.email}
                  onChange={handleEditInputChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact</label>
                <input
                  type="tel"
                  className="form-control"
                  name="contact"
                  value={editData.contact}
                  onChange={handleEditInputChange}
                  placeholder="Enter contact number"
                />
              </div>
              <div className="edit-actions">
                <button className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button>
                <button className="btn btn-secondary" onClick={handleEditCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="profile-name">{user.fullname}</h1>
              <p className="profile-role">Wanderer • Storyteller • Explorer</p>
              {user.contact && <p className="profile-contact">📞 {user.contact}</p>}
              <p className="profile-email">✉️ {user.email}</p>

              <div className="profile-actions">
                <button className="btn btn-primary" onClick={handleEditClick}>
                  Edit Profile
                </button>
                <button className="btn btn-outline-warning" onClick={() => setShowPasswordModal(true)}>
                  Change Password
                </button>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">🌍</div>
          <div className="stat-content">
            <div className="stat-number">{stats.trips}</div>
            <div className="stat-label">Trips</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div className="stat-content">
            <div className="stat-number">{stats.stories}</div>
            <div className="stat-label">Stories</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📸</div>
          <div className="stat-content">
            <div className="stat-number">{stats.photos}</div>
            <div className="stat-label">Photos</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚩</div>
          <div className="stat-content">
            <div className="stat-number">{stats.countries}</div>
            <div className="stat-label">Countries</div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h2>About</h2>
        <p>
          Passionate traveler documenting journeys across the globe. I believe every trip is a chapter in the
          story of life. From the bustling streets of Tokyo to the serene beaches of Santorini, I chase
          experiences that transform perspective.
        </p>
      </div>

      {/* Member Info */}
      <div className="member-section">
        <div className="member-badge">
          <span className="badge-icon">📅</span>
          <div className="member-info">
            <p className="member-title">Member since {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
            <p className="member-subtitle">Exploring the world with MySafar</p>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Change Password</h5>
              <button className="btn-close" onClick={() => setShowPasswordModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      oldPassword: e.target.value,
                    }))
                  }
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}