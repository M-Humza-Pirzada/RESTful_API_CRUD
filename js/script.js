$(document).ready(function () {
    // Call loadTable initially when page loads
  $(document).ready(function () {
    loadTable();
  });
  // Call table end
  //Fetch All Records
  function loadTable() {
    $("#load-table").html("");
    $.ajax({
      url: "http://localhost/Q_solution/rest_api_php/crud_api_apr/api_fetch_all.php",
      method: "get",
      success: function (data) {
        $("#load-table").empty(); // Clear previous data
        if (data.status == false) {
          $("#load-table").append(
            `<tr><td colspan='6'><h2>${data.message}</h2></td></tr>`
          );
        } else {
          let serialNumber = 1; // Reset serial number
          $.each(data, function (key, value) {
            $("#load-table").append(`
                    <tr>
                        <td>${serialNumber}</td>   <!-- Serial number -->
                        <td>${value.std_name}</td>
                        <td>${value.std_class}</td>
                        <td>${value.std_age}</td>
                        <td>${value.std_contact}</td>
                        <td><button class='edit-btn' data-eid='${value.std_id}'>Edit</button></td>
                        <td><button class='delete-btn' data-eid='${value.std_id}'>Delete</button></td>
                    </tr>`);
            serialNumber++; // Increment serial number for next row
          });
        }
      },
    });
  }
  loadTable();
  //End loatTable

  //Show success or Error message
  function message(message, status) {
    if (status == true) {
      $("#success-message").html(message).slideDown();
      $("#error-message").slideUp();
      setTimeout(function () {
        $("#success-message").slideUp();
      }, 4000);
    } else if (status == false) {
      $("#error-message").html(message).slideDown();
      $("#success-message").slideUp();
      setTimeout(function () {
        $("#error-message").slideUp();
      }, 4000);
    }
  }
  // Message end

  // form data convert in json jo array ki form m ata h
  function jsonData(targetForm) {
    let arr = $(targetForm).serializeArray();
    // console.log(arr);
    let obj = {};
    // console.log(obj);
    for (let a = 0; a < arr.length; a++) {
      obj[arr[a].name] = arr[a].value;
      if (arr[a].value == "") {
        return false;
      }
    }
    let jsonString = JSON.stringify(obj);
    return jsonString;
    // console.log(jsonString);
  }
  // End json data

  

  //Insert New Record
  $("#save-button").on("click", function (e) {
    e.preventDefault();
    let objJson = jsonData("#addForm");
    console.log(objJson);
    if (objJson == false) {
      message("All field are reqired", status);
    } else {
      $.ajax({
        url: "http://localhost/Q_solution/rest_api_php/crud_api_apr/api_insert.php",
        type: "POST",
        data: objJson,
        success: function (data) {
          message(data.message, data.status);
          if (data.status === true) {
            loadTable();
            $("#addForm").trigger("reset");
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("AJAX Error: ", textStatus, errorThrown);
          message("Data Not Inserted", false);
        },
      });
    }
  });
  // End insert

  //Delete Record
  $(document).on("click", ".delete-btn", function () {
    if (confirm("Are you sure want to delete")) {
      let student_id = $(this).data("eid");
      let obj = { sid: student_id };
      let jsonData = JSON.stringify(obj); // ya method obj ko  json mein convert krta h
      console.log(jsonData);

      let row = this;
      console.log(row);

      $.ajax({
        url: "http://localhost/Q_solution/rest_api_php/crud_api_apr/api_delete.php",
        type: "POST",
        data: jsonData,
        success: function (data) {
          loadTable();
          message(data.message, data.status);
          if (data.status == true) {
            $(row).closest("tr").fadeOut(5000);
          }
        },
      });
    }
  });
  // End Delete

  //Fetch Single Record : Show in Modal Box
  $(document).on("click", ".edit-btn", function () {
    $("#modal").show();
    let student_id = $(this).data("eid");
    let obj = { sid: student_id };
    let jsonData = JSON.stringify(obj); // ya method obj ko  json mein convert krta h
    // console.log(jsonData);

    $.ajax({
      url: "http://localhost/Q_solution/rest_api_php/crud_api_apr/api_fetch_single.php",
      type: "post",
      data: jsonData,
      success: function (data) {
        $("#edit-id").val(data[0].std_id);
        $("#edit-name").val(data[0].std_name);
        $("#edit-class").val(data[0].std_class);
        $("#edit-age").val(data[0].std_age);
        $("#edit-contact").val(data[0].std_contact);
      },
    });
  });
  // Fetch single record end

  //Hide Modal Box
  $("#close-btn").on("click", function () {
    $("#modal").hide();
  });
  // Hide End

  //Update Record
  $("#edit-submit").on("click", function (e) {
    e.preventDefault();
    let objJson = jsonData("#edit-form");
    console.log(objJson);
    if (objJson == false) {
      message("All field are reqired", status);
    } else {
      $.ajax({
        url: "http://localhost/Q_solution/rest_api_php/crud_api_apr/api_update.php",
        type: "POST",
        data: objJson,
        success: function (data) {
          message(data.message, data.status);
          if (data.status === true) {
            loadTable();
            $("#edit-form").trigger("reset");
            $("#modal").fadeOut();
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("AJAX Error: ", textStatus, errorThrown);
          message("Data Not Inserted", false);
        },
      });
    }
  });
  //   End Update

  //Live Search Record
  $("#search").on("keyup", function () {
    let searchValue = $(this).val();
    $("#load-table").empty();

    $.ajax({
      url:
        "http://localhost/Q_solution/rest_api_php/crud_api_apr/api_search.php?search=" +
        searchValue,
      type: "GET",
      success: function (data) {
        if (data.status == false) {
          $("#load-table").append(
            `<tr><td colspan='7'><h2>${data.message}</h2></td></tr>`
          );
        } else {
          let serialNumber = 1; // Reset serial number
          $.each(data, function (key, value) {
            $("#load-table").append(`
                    <tr>
                        <td>${serialNumber}</td>   <!-- Serial number -->
                        <td>${value.std_name}</td>
                        <td>${value.std_class}</td>
                        <td>${value.std_age}</td>
                        <td>${value.std_contact}</td>
                        <td><button class='edit-btn' data-eid='${value.std_id}'>Edit</button></td>
                        <td><button class='delete-btn' data-eid='${value.std_id}'>Delete</button></td>
                    </tr>`);
            serialNumber++; // Increment serial number for next row
          });
        }
      },
    });
  });
  //   End Search
});
