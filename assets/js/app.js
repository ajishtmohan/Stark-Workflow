// 1. Job Controller
var jobController = (function() {

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
            var clientID = 0;
            var newClientAdded = new ClientDetails(clientID, clientName, clientAddress, clientCity, clientRep, clientEmail, clientPhone);
            console.log(newClientAdded);

            data.clientData.push(newClientAdded);
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
        clientContainer: '.new-clients',
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

        addClientListItem: function() {
            var html, newHtml, element, clientInfo;

            element = DOMstrings.clientContainer;

            clientInfo = [1, DOMstrings.inputClientName, DOMstrings.inputClientAddress, DOMstrings.inputClientCity, DOMstrings.inputClientRep, DOMstrings.inputClientEmail, DOMstrings.inputClientPhone]

            html = `<div class="client-number"><p>No</p></div><div class="client-name"><p>${jobController.newClientAdded.clientName}</p></div><div class="client-address"><p>Address</p></div><div class="client-city"><p>City</p></div><div class="client-person-incharge"><p>clientRep</p></div><div class="client-email"><p>Email</p></div><div class="client-phone"><p>Phone</p></div>`,

            console.log(html);

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
        }
    }
    
})();

// 3. Central Controller
var controller = (function(jobCtrl, UICtrl) {

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
        console.log(inputCL);

        // 2. Add the client data to 'data'
        newClient = jobCtrl.addNewClient(inputCL.clientName, inputCL.clientAddress, inputCL.clientCity, inputCL.clientRep, inputCL.clientEmail, inputCL.clientPhone);

        UICtrl.clearClientForm();
        UICtrl.hideClientForm();
        

        // 3. Update the Client UI
        UICtrl.addClientListItem();

    };


    return {
        init: function() {
            UICtrl.showClients()
            UICtrl.activateBtn()
            console.log('App initialised!')
            setupEventlisteners();
        }
        
    }
})(jobController, UIController);

controller.init();