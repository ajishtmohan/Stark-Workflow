// 1. Client Controller
var clientController = (function() {

    var ClientDetails = function(clientID, clientName, clientAddress, clientCity, clientRep, clientEmail, clientPhone) {
        this.clientID = clientID;
        this.clientName = clientName;
        this.clientAddress = clientAddress;
        this.clientCity = clientCity;
        this.clientRep = clientRep;
        this.clientEmail = clientEmail;
        this.clientPhone = clientPhone;
    };

    var clientDatabase = {
        clientData: [
            {
                clientID: 'CLI-1',
                clientName: 'Karnataka Tourism',
                clientAddress: '49, 2nd Floor, Khanija Bhavan, Race Course Road',
                clientCity: 'Bangalore',
                clientRep: 'Chief Secretary',
                clientEmail: 'feedback@karnatakatourism.org',
                clientPhone: '+91-80-2235 2424'
            },
            {
                clientID: 'CLI-2',
                clientName: 'Kerala Tourism',
                clientAddress: 'Park Views',
                clientCity: 'Thiruvananthapuram',
                clientRep: 'Chief Secretary',
                clientEmail: 'info@keralatourism.org',
                clientPhone: '+91-471-2322279'
            },
            {
                clientID: 'CLI-3',
                clientName: 'Tamilnadu Tourism',
                clientAddress: 'Tamil Nadu Tourism Complex, No.2 Wallajah Road',
                clientCity: 'Chennai',
                clientRep: 'Chief Secretary',
                clientEmail: 'support@ttdconline.com',
                clientPhone: '+91-44-25333850'
            },
        ],

        clientList: [],
    };
    
    return {
        addNewClient: function(clientName, clientAddress, clientCity, clientRep, clientEmail, clientPhone) {
            var clientID;
            if (clientDatabase.clientData.length == 0) {
                clientID = 'CLI-' + 1;
            } else if (clientDatabase.clientData.length > 0) {
                clientID = 'CLI-' + (clientDatabase.clientData.length + 1);
            }

            var newClientAdded = new ClientDetails(clientID, clientName, clientAddress, clientCity, clientRep, clientEmail, clientPhone);

            clientDatabase.clientData.push(newClientAdded);

            return newClientAdded;
        },

        deleteClient: function(itemID) {
            var clientIDs, index;
            clientIDs = clientDatabase.clientData.map(function(current){
                return current.clientID;
            });

            index = clientIDs.indexOf(itemID);

            if (index !== -1) {
                clientDatabase.clientData.splice(index, 1);
            }
            
        },

        updateDataClientList: function() {
            clientDatabase.clientList.forEach(function(cur){
                length = clientDatabase.clientList.length;
                for (var i = 0; i < length; i++) {
                    clientDatabase.clientList[i].remove();
                }
            });
/////////////////////////////////////////////////////////////////////////////////////////////////////////
            clientDatabase.clientData.map(function(){
                var unsorted = [];
                var sorted;
                length = clientDatabase.clientData.length;
                for (var i = 0; i < length; i++) {
                    clientDatabase.clientList.push(clientDatabase.clientData[i].clientName);
                };
            });
        },
/////////////////////////////////////////////////////////////////////////////////////////////////////////

        testing: function() {
            console.log(clientDatabase);
        },
        getData: function() {
            return clientDatabase;
        },
    }
})();

// 2. Job Controller
var jobController = (function(){

});

// 2. UI Controller
var UIController = (function(clientCtrl) {

    var DOMstrings = {
        // New Client Form
        inputClientName: '#new-client-name',
        inputClientAddress: '#new-client-address',
        inputClientCity: '#new-client-city',
        inputClientRep: '#new-client-rep',
        inputClientEmail: '#new-client-email',
        inputClientPhone: '#new-client-phone',

        // Client List
        clientContainer: '.client-list-container',
    }

    var hideSideMenu = function() {
        var leftMenu = document.querySelector('.left-menu');

        if (leftMenu.offsetWidth === 250) {
            var leftMenuBtns = document.getElementsByClassName('left-menu-title');
            for (var i = 0; i < leftMenuBtns.length; i++) {
                leftMenuBtns[i].style.display = 'none';
            };
            document.querySelector('.noti-bar-arrow').classList.toggle('noti-bar-arrow-flip');
            document.querySelector('.office').classList.toggle('office-small');
            document.querySelector('.display-area').classList.toggle('display-area-wide');
            leftMenu.style.width = '75px';
        } else {
            leftMenu.style.width = '250px';
            document.querySelector('.noti-bar-arrow').classList.toggle('noti-bar-arrow-flip');
            document.querySelector('.display-area').classList.toggle('display-area-wide');
            document.querySelector('.office').classList.toggle('office-small');

            // do something else
            setTimeout(function() { displayLeftMenuTitles(); }, 300);
            displayLeftMenuTitles = function() {
                var leftMenuBtns = document.getElementsByClassName('left-menu-title');            
                for (var i = 0; i < leftMenuBtns.length; i++) {
                    leftMenuBtns[i].style.display = 'inline-block';
                };
            }
            
        }
    }

    var leftBtnList = document.getElementById('left-btn-list');
    var leftBtns = leftBtnList.getElementsByClassName('left-menu-btn');
    for (var i = 0; i < leftBtns.length; i++) {
        leftBtns[i].addEventListener('click', function() {
            var current = document.getElementsByClassName('left-menu-active');
            current[0].className = current[0].className.replace(' left-menu-active', '');
            this.className += ' left-menu-active';
        });
    }

    
    var showDashboard = function() {
        hideJobs();
        hideClients();
        hideWorkGroups();
        hideEmployees();
        document.querySelector('.dashboard-container').style.display = 'block';
        document.querySelector('.bar-title').textContent = 'DASHBOARD';
    };

    var showJobs = function() {
        hideDashboard();
        hideClients();
        hideWorkGroups();
        hideEmployees();
        document.querySelector('.job-container').style.display = 'block';
        document.querySelector('.bar-title').textContent = 'JOBS';
    };

    var showClients = function() {
        hideDashboard();
        hideJobs();
        hideWorkGroups();
        hideEmployees();
        document.querySelector('.clients-container').style.display = 'block'
        document.querySelector('.bar-title').textContent = 'CLIENTS';
    };

    var showWorkGroups = function() {
        hideDashboard();
        hideJobs();
        hideClients();
        hideEmployees();
        document.querySelector('.workgroup-container').style.display = 'block'
        document.querySelector('.bar-title').textContent = 'WORK GROUPS';
    }

    var showEmployees = function() {
        hideDashboard();
        hideJobs();
        hideClients();
        hideWorkGroups();
        document.querySelector('.employees-container').style.display = 'block'
        document.querySelector('.bar-title').textContent = 'EMPLOYEES';
    };
    
    var hideDashboard = function() {
        document.querySelector('.dashboard-container').style.display = 'none';
    };

    var hideJobs = function() {
        document.querySelector('.job-container').style.display = 'none';
    };

    var hideClients = function() {
        document.querySelector('.clients-container').style.display = 'none';
    };

    var hideWorkGroups = function() {
        document.querySelector('.workgroup-container').style.display = 'none';
    };

    var hideEmployees = function(){
        document.querySelector('.employees-container').style.display = 'none';
    };

    var clientFormState;
    var showClientForm = function() {
        document.querySelector('.new-client-form').style.display = 'block';
        setTimeout(function() { 
            document.querySelector('.new-client-form').style.opacity = '1';
        }, 100);
        
    };

    var clearClientForm = function() {
        var fields, fieldsArr;

        fields = document.querySelectorAll(DOMstrings.inputClientName + ', ' + DOMstrings.inputClientAddress + ', ' + DOMstrings.inputClientCity + ', ' + DOMstrings.inputClientRep + ', ' + DOMstrings.inputClientEmail + ', ' + DOMstrings.inputClientPhone);

        fieldsArr = Array.prototype.slice.call(fields);
        fieldsArr.forEach(function(current, index, array) {
            current.value = '';
        });
        fieldsArr[0].focus();
    };

    var hideClientForm = function() {
        document.querySelector('.new-client-form').style.opacity = '0';
        setTimeout(function() { 
            document.querySelector('.new-client-form').style.display = 'none';
        }, 300);
        
    };
    

    return {
        getClientData: function() {
            return {
                clientName: document.querySelector(DOMstrings.inputClientName).value,
                clientAddress: document.querySelector(DOMstrings.inputClientAddress).value,
                clientCity: document.querySelector(DOMstrings.inputClientCity).value,
                clientRep: document.querySelector(DOMstrings.inputClientRep).value,
                clientEmail: document.querySelector(DOMstrings.inputClientEmail).value,
                clientPhone: document.querySelector(DOMstrings.inputClientPhone).value,
            }
        },


        updateClientList: function() {
            var storedClientData, totalClients, element, slNo;

            // Get stored data
            storedClientData = clientCtrl.getData().clientData;

            // Select all clients from list
            totalClients = document.querySelector('.client-list-container').querySelectorAll('.new-clients');

            // Remove all clients from Client List
            for (var i = 0; i < totalClients.length; i++) {
                totalClients[i].remove();
            }

            element = DOMstrings.clientContainer;

            for (var i = 0; i < storedClientData.length; i++) {

                if (storedClientData.length == 0) {
                    slNo = 1;
                } else if (storedClientData.length > 0){
                    slNo = storedClientData.length;
                }

                html = `<div class="new-clients" id="${storedClientData[i].clientID}">
                        <div class="client-number client-ele-div"><p>${i + 1}</p></div>
                        <div class="client-name client-ele-div"><p>${storedClientData[i].clientName}</p></div>
                        <div class="client-address client-ele-div"><p>${storedClientData[i].clientAddress}</p></div>
                        <div class="client-city client-ele-div"><p>${storedClientData[i].clientCity}</p></div>
                        <div class="client-person-incharge client-ele-div"><p>${storedClientData[i].clientRep}</p></div>
                        <div class="client-email client-ele-div"><p>${storedClientData[i].clientEmail}</p></div>
                        <div class="client-phone client-ele-div"><p>${storedClientData[i].clientPhone}</p></div>
                        <div class="client-edit client-ele-div"><p><ion-icon name="create-outline"></ion-icon></p></div>
                        <div class="client-delete client-ele-div" id="${'D_' + storedClientData[i].clientID}"><p><ion-icon name="trash-outline"></ion-icon></p></div>
                    </div>`;

                    document.querySelector(element).insertAdjacentHTML('beforeend', html);

                    slNo ++;

            }

            // storedClientData.forEach(obj, function(){
            //     html =   `<div class="new-clients" id="CLI-0">
                //            <div class="client-number client-ele-div"><p>${slNo}</p></div>
                //            <div class="client-name client-ele-div"><p>${obj.clientName}</p></div>
                //            <div class="client-address client-ele-div"><p>${obj.clientAddress}</p></div>
                //            <div class="client-city client-ele-div"><p>${obj.clientCity}</p></div>
                //            <div class="client-person-incharge client-ele-div"><p>${obj.clientRep}</p></div>
                //            <div class="client-email client-ele-div"><p>${obj.clientEmail}</p></div>
                //            <div class="client-phone client-ele-div"><p>${obj.clientPhone}</p></div>
            //              </div>`;
            // })
        },

        updateClientDropdown: function() {
            var clientsHTML;
            var clientDropdownList = [];

            clientDropdownList = document.getElementById('addedClientList').querySelectorAll('.clientDropdownItem');
            console.log(clientDropdownList);
            for (var i = 0; i < clientDropdownList.length; i++) {
                clientDropdownList[i].remove();
            };

            clientCtrl.getData().clientData.map(function(cur) {
                clientsHTML =   `<select name="Client Name" id="addedClientList">
                                    <option value="${cur.clientName}">${cur.clientName}</option>
                                </select>`;
                
            document.getElementById('addedClientList').insertAdjacentHTML('beforeend', clientsHTML);
            })
        },

        showDashboard,
        showJobs,
        showClients,
        hideSideMenu,
        showClientForm,
        hideClientForm,
        clearClientForm,
        showWorkGroups,
        showEmployees,

        getDOMstrings: function() {
            return DOMstrings;
        },

        getTotalClients: function() {
            console.log(totalClients);
        },

        getClientFormState: function() {
            return clientFormState;
        }
    }
    
})(clientController);

// 3. Central Controller
var controller = (function(clientCtrl, UICtrl) {

    var setupEventlisteners = function() {
        // Hide Side Menu Bar
        document.querySelector('.noti-bar-title').addEventListener('click', UICtrl.hideSideMenu);

        // Show Dashboard
        document.querySelector('.dashboard-btn').addEventListener('click', UICtrl.showDashboard);

        // Show Jobs Panel
        document.querySelector('.jobs-btn').addEventListener('click', UICtrl.showJobs);

        // Show Clients Panel
        document.querySelector('.clients-btn').addEventListener('click', UICtrl.showClients);

        // Show New Client Form
        document.querySelector('.add-client-btn').addEventListener('click', UICtrl.showClientForm);

        // Hide New Client Form
        document.querySelector('.client-form-cancel').addEventListener('click', UICtrl.hideClientForm);

        // Add New Client
        document.querySelector('.client-form-submit').addEventListener('click', ctrlAddClient);

        // Show Work Group
        document.querySelector('.workgroup-btn').addEventListener('click', UICtrl.showWorkGroups);

        // Show Employees
        document.querySelector('.employees-btn').addEventListener('click', UICtrl.showEmployees);

        // Delete existing client
        document.querySelector('.client-list-container').addEventListener('click', ctrlDeleteClient);
        
    }

    

    var ctrlAddClient = function() {
        // UICtrl.getClientFormState();
        var inputCL, newClient;

        // 1. Get Client Data from UI
        inputCL = UICtrl.getClientData();

        // 2. Add the client data to 'data'
        newClient = clientCtrl.addNewClient(inputCL.clientName, inputCL.clientAddress, inputCL.clientCity, inputCL.clientRep, inputCL.clientEmail, inputCL.clientPhone);

        UICtrl.clearClientForm();
        UICtrl.hideClientForm();

        // 3. Update the Client UI
        UICtrl.updateClientList();
        clientCtrl.updateDataClientList();
        UIController.updateClientDropdown();

    };

    var ctrlDeleteClient = function() {

        var clientDeleteBtns = document.getElementsByClassName('client-delete');
        var clickedID, splitID, itemID;
        for (var i = 0; i < clientDeleteBtns.length; i++) {
            clientDeleteBtns[i].onclick = function() {
                clickedID = this.id;
                console.log(clickedID);
                splitID = clickedID.split('_');
                console.log(splitID);
                itemID = splitID[1];
                clientCtrl.deleteClient(itemID);
                UICtrl.updateClientList(); 
                clientCtrl.updateDataClientList();
                UIController.updateClientDropdown();
            }   
        }
    };


    return {
        init: function() {
            UICtrl.showClients();
            console.log('App initialised!');
            UICtrl.updateClientList();
            setupEventlisteners();
            ctrlDeleteClient();
            clientCtrl.updateDataClientList();
            UIController.updateClientDropdown();
        }
        
    }
})(clientController, UIController);

controller.init();