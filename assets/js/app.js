// 1. Job Controller
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
        clientData: [],
    };

    return {
        addNewClient: function(clientName, clientAddress, clientCity, clientRep, clientEmail, clientPhone) {

            if (data.clientData.length == 0) {
                clientID = 'CLI-' + 1;
            } else if (data.clientData.length > 0) {
                clientID = 'CLI-' + (data.clientData.length + 1);
            }

            var newClientAdded = new ClientDetails(clientID, clientName, clientAddress, clientCity, clientRep, clientEmail, clientPhone);

            data.clientData.push(newClientAdded);

            return newClientAdded;
        },

        testing: function() {
            console.log(data);
        }
    }
    
})();



// 2. UI Controller
var UIController = (function() {

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

    var showClientForm = function() {
        document.querySelector('.new-client-form').style.display = 'block';
        setTimeout(function() { 
            document.querySelector('.new-client-form').style.opacity = '1';
        }, 300);
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

        clearClientForm: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputClientName + ', ' + DOMstrings.inputClientAddress + ', ' + DOMstrings.inputClientCity + ', ' + DOMstrings.inputClientRep + ', ' + DOMstrings.inputClientEmail + ', ' + DOMstrings.inputClientPhone);

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array) {
                current.value = '';
            });
            fieldsArr[0].focus();
        },

        addClientListItem: function(obj) {
            var html, element, slNo, totalClients;

            totalClients = document.querySelector('.client-list-container').querySelectorAll('.new-clients');
            console.log(totalClients);

            if (totalClients.length == 0) {
                slNo = 1;
            } else if (totalClients.length > 0) {
                slNo = totalClients.length + 1;
            }

            element = DOMstrings.clientContainer;

            html = `<div class="new-clients">
                        <div class="client-number client-ele-div"><p>${slNo}</p></div>
                        <div class="client-name client-ele-div"><p>${obj.clientName}</p></div>
                        <div class="client-address client-ele-div"><p>${obj.clientAddress}</p></div>
                        <div class="client-city client-ele-div"><p>${obj.clientCity}</p></div>
                        <div class="client-person-incharge client-ele-div"><p>${obj.clientRep}</p></div>
                        <div class="client-email client-ele-div"><p>${obj.clientEmail}</p></div>
                        <div class="client-phone client-ele-div"><p>${obj.clientPhone}</p></div>
                    </div>`,

            
            document.querySelector(element).insertAdjacentHTML('beforeend', html);

            slNo ++;

            
            

            return totalClients;

        },

        showDashboard,
        showJobs,
        showClients,
        hideSideMenu,
        activateBtn,
        showClientForm,
        hideClientForm,

        getDOMstrings: function() {
            return DOMstrings;
        },

        getTotalClients: function() {
            console.log(totalClients);
        }
    }
    
})();

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
    }
    

    var ctrlAddClient = function() {
        var inputCL, newClient;

        // 1. Get Client Data from UI
        inputCL = UICtrl.getClientData();

        // 2. Add the client data to 'data'
        newClient = clientCtrl.addNewClient(inputCL.clientName, inputCL.clientAddress, inputCL.clientCity, inputCL.clientRep, inputCL.clientEmail, inputCL.clientPhone);

        UICtrl.clearClientForm();
        UICtrl.hideClientForm();

        // 3. Update the Client UI
        UICtrl.addClientListItem(newClient);

    };


    return {
        init: function() {
            UICtrl.showClients()
            UICtrl.activateBtn()
            console.log('App initialised!')
            setupEventlisteners();
        }
        
    }
})(clientController, UIController);

controller.init();