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

    var data = {
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
            if (data.clientData.length == 0) {
                clientID = 'CLI-' + 1;
            } else if (data.clientData.length > 0) {
                clientID = 'CLI-' + (data.clientData.length + 1);
            }

            var newClientAdded = new ClientDetails(clientID, clientName, clientAddress, clientCity, clientRep, clientEmail, clientPhone);

            data.clientData.push(newClientAdded);

            return newClientAdded;
        },

        updateDataClientList: function() {
            data.clientList = [];
            data.clientData.map(function(cur){
                data.clientList.push(cur.clientName);
            })
        },

        deleteClient: function(itemID) {
            var clientIDs, index;
            clientIDs = data.clientData.map(function(current){
                return current.clientID;
            });

            index = clientIDs.indexOf(itemID);

            if (index !== -1) {
                data.clientData.splice(index, 1);
            }
            
        },

        testing: function() {
            console.log(data);
        },
        getData: function() {
            return data;
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
        document.querySelector('.dashboard-container').style.display = 'block';
        document.querySelector('.job-container').style.display = 'none';
        document.querySelector('.clients-container').style.display = 'none';
        document.querySelector('.bar-title').textContent = 'DASHBOARD';
    };

    var showJobs = function() {
        document.querySelector('.job-container').style.display = 'block';
        document.querySelector('.dashboard-container').style.display = 'none';
        document.querySelector('.clients-container').style.display = 'none';
        document.querySelector('.bar-title').textContent = 'JOBS';
    };

    var showClients = function() {
        document.querySelector('.clients-container').style.display = 'block'
        document.querySelector('.job-container').style.display = 'none';
        document.querySelector('.dashboard-container').style.display = 'none';
        document.querySelector('.bar-title').textContent = 'CLIENTS';
    };

    var activateBtn = function() {
        var leftMenuList = document.querySelectorAll('#left-btn-list');
            for (var i = 0; i < leftMenuList.length; i++) {
            leftMenuList[i].addEventListener('click', activateClass);
        };

    function activateClass(e) {
        for (var i = 0; i < leftMenuList.length; i++) {
            leftMenuList[i].classList.remove('.left-menu-active');
        }
        e.target.classList.add('.left-menu-active');
        }
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
            //     html = `<div class="new-clients" id="CLI-0">
            //             <div class="client-number client-ele-div"><p>${slNo}</p></div>
            //            <div class="client-name client-ele-div"><p>${obj.clientName}</p></div>
            //            <div class="client-address client-ele-div"><p>${obj.clientAddress}</p></div>
            //            <div class="client-city client-ele-div"><p>${obj.clientCity}</p></div>
            //            <div class="client-person-incharge client-ele-div"><p>${obj.clientRep}</p></div>
            //            <div class="client-email client-ele-div"><p>${obj.clientEmail}</p></div>
            //            <div class="client-phone client-ele-div"><p>${obj.clientPhone}</p></div>
            //        </div>`;
            // })
        },

        updateClientDropdown: function() {
            var clientsHTML;

            var updateClientDropdownList = document.getElementById('addedClientList');
            for (var i = 0; i < updateClientDropdownList.length; i++) {
                updateClientDropdownList[i].remove();
            }

            clientCtrl.getData().clientData.map(function(cur) {
                clientsHTML =   `<select name="Client Name" id="addedClientList">
                                <option value="${cur.clientName}">${cur.clientName}</option>
                            </select>`
                
            document.getElementById('addedClientList').insertAdjacentHTML('beforeend', clientsHTML);
            })
        },

        showDashboard,
        showJobs,
        showClients,
        hideSideMenu,
        activateBtn,
        showClientForm,
        hideClientForm,
        clearClientForm,

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
            UICtrl.activateBtn();
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