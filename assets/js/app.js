// 1. Job Controller
var jobController = (function() {
    
})();

// 2. UI Controller
var UIController = (function() {

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
    

    return {
        showDashboard,
        showJobs,
        showClients,
        hideSideMenu,
        activateBtn,

        
        
    }
    
})();

// 3. Central Controller
var controller = (function(jobCtrl, UICtrl) {
    // Hide Side Menu Bar
    document.querySelector('.noti-bar-title').addEventListener('click', UIController.hideSideMenu);

    // Show Dashboard
    document.querySelector('.dashboard-btn').addEventListener('click', UIController.showDashboard);

    // Show Jobs Panel
    document.querySelector('.jobs-btn').addEventListener('click', UIController.showJobs);

    // Show Clients Panel
    document.querySelector('.clients-btn').addEventListener('click', UIController.showClients);

    return {
        init: function() {
            UICtrl.showClients()
            UICtrl.activateBtn()
        }
        
    }
})(jobController, UIController);

controller.init();