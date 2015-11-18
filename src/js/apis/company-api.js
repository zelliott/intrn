// The API layer which handles the actual syncing of Companys  with the server
import $ from 'jquery';

const BASE_URL = '/api/companies/';

const CompanyApi = {
  create: function(company, success, failure) {
    $.ajax({
      url: BASE_URL,
      type: 'POST',
      dataType: 'json',
      data: company,
      success: function(data) {
        success(data);
      },
      error: function(xhr, status, error) {
        failure(error);
      }
    });
  },

  destroy: function(company, success, failure) {
    $.ajax({
      url: BASE_URL + company.id,
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

  getAllNames: function(success, failure) {
    $.ajax({
      url: BASE_URL + 'names',
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

  get: function(company, success, failure) {
    $.ajax({
      url: BASE_URL + company.name,
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

  update: function(company, props, success, failure) {
    $.ajax({
      url: BASE_URL + company.id,
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

export default CompanyApi;
