document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------
    // VIEW NAVIGATION LOGIC
    // ----------------------------
    const navActions = document.querySelectorAll('.nav-action');
    const views = document.querySelectorAll('.view');

    function switchView(targetId) {
        // Hide all views
        views.forEach(view => {
            view.classList.remove('active');
        });

        // Remove active state from nav links
        navActions.forEach(nav => {
            if(nav.classList.contains('nav-link')) {
                nav.classList.remove('active');
            }
        });

        // Show target view
        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Add active state to corresponding nav link
        navActions.forEach(nav => {
            if (nav.dataset.target === targetId && nav.classList.contains('nav-link')) {
                nav.classList.add('active');
            }
        });

        // Trigger animations for the new active view
        triggerFadeIns(targetView);
    }

    navActions.forEach(action => {
        action.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = action.dataset.target;
            if (targetId) {
                switchView(targetId);
            }
        });
    });

    // ----------------------------
    // FADE IN ANIMATION LOGIC
    // ----------------------------
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function triggerFadeIns(container) {
        const elementsInContainer = container.querySelectorAll('.fade-in');
        elementsInContainer.forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => {
                el.classList.add('visible');
            }, 50); // small delay to force reflow
        });
    }

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve if we only want it to fade in once
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // Initial trigger for Landing view
    triggerFadeIns(document.getElementById('view-landing'));

    // ----------------------------
    // SIMULATOR LOGIC (Escrow Room)
    // ----------------------------
    const simStatus = document.getElementById('simStatus');
    const buyerBalance = document.getElementById('buyerBalance');
    const escrowBalance = document.getElementById('escrowBalance');
    const sellerBalance = document.getElementById('sellerBalance');
    
    // Entities
    const entityBuyer = document.getElementById('entityBuyer');
    const entityEscrow = document.getElementById('entityEscrow');
    const entitySeller = document.getElementById('entitySeller');
    const entityMod = document.getElementById('entityMod');
    const entitiesList = [entityBuyer, entityEscrow, entitySeller, entityMod];

    // Buttons
    const btnAgree = document.getElementById('btnAgree');
    const btnDeliver = document.getElementById('btnDeliver');
    const btnApprove = document.getElementById('btnApprove');
    const btnDispute = document.getElementById('btnDispute');
    const btnModSeller = document.getElementById('btnModSeller');
    const btnModBuyer = document.getElementById('btnModBuyer');
    const simResetBtn = document.getElementById('simResetBtn');

    // Button Groups
    const fulfillmentBtns = document.getElementById('fulfillmentBtns');
    const approvalBtns = document.getElementById('approvalBtns');
    const modBtns = document.getElementById('modBtns');

    // Chat
    const chatMessages = document.getElementById('chatMessages');

    function addChat(text, type) {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${type}`;
        msg.innerText = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function clearChat() {
        chatMessages.innerHTML = '';
        addChat("Escrow created by Gadget Store KE. Awaiting Buyer funds.", "system");
    }

    function hideAllBtns() {
        if(!btnAgree) return;
        btnAgree.style.display = 'none';
        fulfillmentBtns.style.display = 'none';
        approvalBtns.style.display = 'none';
        modBtns.style.display = 'none';
        simResetBtn.style.display = 'none';
        entityMod.style.display = 'none';
    }

    function removeActive() {
        entitiesList.forEach(e => {
            if(e) e.classList.remove('active');
        });
    }

    function initSim() {
        if(!simStatus) return; // Prevent errors if running on a page without simulator
        
        removeActive();
        hideAllBtns();
        clearChat();
        
        simStatus.className = 'badge badge-lg badge-warning';
        simStatus.innerText = "Stage 1: Awaiting Payment";
        buyerBalance.innerText = "KES 150,000";
        escrowBalance.innerText = "KES 0";
        sellerBalance.innerText = "KES 0";
        
        btnAgree.style.display = "block";
        entityBuyer.classList.add('active');
    }

    if (btnAgree) {
        btnAgree.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Stage 2: Funds Secured in Escrow Vault";
            simStatus.className = 'badge badge-lg badge-warning';
            buyerBalance.innerText = "KES 0";
            escrowBalance.innerText = "KES 150,000";
            
            fulfillmentBtns.style.display = "flex";
            entityEscrow.classList.add('active');
            
            addChat("Buyer (Jane Doe) deposited KES 150,000 via M-Pesa. Funds secured.", "system");
        });

        btnDeliver.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Stage 3: Shipped via Sendy";
            simStatus.className = 'badge badge-lg badge-warning';
            approvalBtns.style.display = "flex";
            entitySeller.classList.add('active');
            
            addChat("Gadget Store KE: Added Tracking info. Shipped!", "seller");
            addChat("Status updated to In Transit by Courier API.", "system");
        });

        btnApprove.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Stage 4: Complete. Funds Released.";
            simStatus.className = 'badge badge-lg badge-success';
            escrowBalance.innerText = "KES 0";
            sellerBalance.innerText = "KES 150,000";
            
            simResetBtn.style.display = "block";
            entitySeller.classList.add('active');
            
            addChat("Jane Doe: I got it, condition is perfect! Approving payout.", "buyer");
            addChat("Trustlink Released KES 150,000 to Gadget Store KE.", "system");
        });

        btnDispute.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Stage 4: Dispute Raised. Funds Frozen.";
            simStatus.className = 'badge badge-lg badge-danger';
            
            entityMod.style.display = "flex";
            modBtns.style.display = "flex";
            entityMod.classList.add('active');
            
            addChat("Jane Doe: The box was empty! I'm opening a dispute.", "buyer");
            addChat("Dispute Created. Admin Moderator joined the chat.", "system");
            addChat("Admin: Gadget Store, please provide drop-off proof.", "mod");
        });

        btnModSeller.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Resolved: Mod ruled for Seller. Funds Released.";
            simStatus.className = 'badge badge-lg badge-success';
            escrowBalance.innerText = "KES 0";
            sellerBalance.innerText = "KES 150,000";
            
            simResetBtn.style.display = "block";
            entitySeller.classList.add('active');
            entityMod.style.display = "flex";
            
            addChat("Admin: Reviewing unboxing video and Sendy drop-off logs...", "mod");
            addChat("Admin: Evidence shows valid delivery. Releasing to Seller.", "mod");
        });

        btnModBuyer.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Resolved: Mod ruled for Buyer. Funds Refunded.";
            simStatus.className = 'badge badge-lg badge-success';
            escrowBalance.innerText = "KES 0";
            buyerBalance.innerText = "KES 150,000";
            
            simResetBtn.style.display = "block";
            entityBuyer.classList.add('active');
            entityMod.style.display = "flex";
            
            addChat("Admin: Seller failed to provide drop-off proof. Refunding to Buyer.", "mod");
        });

        simResetBtn.addEventListener('click', () => {
            initSim();
        });

        initSim();
    }
});
