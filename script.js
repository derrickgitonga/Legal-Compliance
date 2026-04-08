document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
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

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simulator Logic
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
    }

    function hideAllBtns() {
        btnAgree.style.display = 'none';
        fulfillmentBtns.style.display = 'none';
        approvalBtns.style.display = 'none';
        modBtns.style.display = 'none';
        simResetBtn.style.display = 'none';
        entityMod.style.display = 'none';
    }

    function removeActive() {
        entitiesList.forEach(e => e.classList.remove('active'));
    }

    function initSim() {
        removeActive();
        hideAllBtns();
        clearChat();
        
        simStatus.innerText = "Stage 1: Awaiting Agreement";
        buyerBalance.innerText = "KES 10,000";
        escrowBalance.innerText = "KES 0";
        sellerBalance.innerText = "KES 0";
        
        btnAgree.style.display = "block";
        entityBuyer.classList.add('active');
        addChat("Waiting for users to connect...", "system");
    }

    if(btnAgree) {
        btnAgree.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Stage 2: Funds Secured in Escrow Vault (CBK Regulated)";
            buyerBalance.innerText = "KES 0";
            escrowBalance.innerText = "KES 10,000";
            
            fulfillmentBtns.style.display = "flex";
            entityEscrow.classList.add('active');
            
            addChat("Buyer has deposited KES 10,000 into Escrow.", "system");
        });

        btnDeliver.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Stage 3: Seller Fulfillment pending Buyer Approval";
            approvalBtns.style.display = "flex";
            entitySeller.classList.add('active');
            
            addChat("Seller: I have completed the requested service. Please review.", "seller");
        });

        btnApprove.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Stage 4: Transaction Complete. Funds Released.";
            escrowBalance.innerText = "KES 0";
            sellerBalance.innerText = "KES 10,000";
            
            simResetBtn.style.display = "block";
            entitySeller.classList.add('active');
            
            addChat("Buyer: Looks good, approving delivery!", "buyer");
            addChat("Escrow released KES 10,000 to Seller.", "system");
        });

        btnDispute.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Stage 4: Dispute Raised. Funds Frozen.";
            simStatus.style.color = "#ef4444";
            
            entityMod.style.display = "block";
            modBtns.style.display = "flex";
            entityMod.classList.add('active');
            
            addChat("Buyer: The delivery is completely wrong. I'm rejecting this.", "buyer");
            addChat("Buyer has raised a Dispute. Moderator joined the chat.", "system");
            addChat("Moderator: I will review the evidence provided by both parties.", "mod");
        });

        btnModSeller.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Resolution: Mod ruled for Seller. Funds Released.";
            simStatus.style.color = "#10b981";
            escrowBalance.innerText = "KES 0";
            sellerBalance.innerText = "KES 10,000";
            
            simResetBtn.style.display = "block";
            entitySeller.classList.add('active');
            entityMod.style.display = "block";
            
            addChat("Moderator: Evidence shows Seller fulfilled the contract verbatim. Releasing funds to Seller.", "mod");
        });

        btnModBuyer.addEventListener('click', () => {
            removeActive();
            hideAllBtns();
            
            simStatus.innerText = "Resolution: Mod ruled for Buyer. Funds Refunded.";
            simStatus.style.color = "#2563eb";
            escrowBalance.innerText = "KES 0";
            buyerBalance.innerText = "KES 10,000";
            
            simResetBtn.style.display = "block";
            entityBuyer.classList.add('active');
            entityMod.style.display = "block";
            
            addChat("Moderator: Seller failed to meet requirements. Refunding Escrow to Buyer.", "mod");
        });

        simResetBtn.addEventListener('click', () => {
            simStatus.style.color = "";
            initSim();
        });

        initSim();
    }
});
