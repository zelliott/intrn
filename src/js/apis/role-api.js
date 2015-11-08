// The API layer which handles the actual syncing of Roles  with the server
import $ from 'jquery';

const BASE_URL = '/api/roles/';

const RoleApi = {
  create: function(role, success, failure) {
    $.ajax({
      url: BASE_URL,
      type: 'POST',
      dataType: 'json',
      data: role,
      success: function(data) {
        success(data);
      },
      error: function() {
        failure();
      }
    });
  },

  destroy: function(role, success, failure) {
    $.ajax({
      url: BASE_URL + role.id,
      type: 'DELETE',
      dataType: 'json',
      success: function(data) {
        success(data);
      },
      error: function(xhr, status, error) {
        failure(error);
      }
    });
  },

  getAll: function(success, failure) {
    $.ajax({
      url: BASE_URL,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        success(data);
      },
      error: function(xhr, status, error) {
        failure(error);
      }
    });
  },

  get: function(id, success, failure) {
    $.ajax({
      url: BASE_URL + id,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        success(data);
      },
      error: function(xhr, status, error) {
        failure(error);
      }
    });
  },

  update: function(role, props, success, failure) {
    $.ajax({
      url: BASE_URL + role.id,
      type: 'PUT',
      dataType: 'json',
      data: props,
      success: function(data) {
        success(data);
      },
      error: function(xhr, status, error) {
        failure(error);
      }
    });
  },
};

export default RoleApi;
