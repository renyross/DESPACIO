document.addEventListener('DOMContentLoaded', () => {
    // Screens & Wrappers
    const landing = document.getElementById('landing');
    const onboardingFlow = document.getElementById('onboarding-flow');
    const onboardingIntent = document.getElementById('onboarding-intent');
    const onboardingPerms = document.getElementById('onboarding-perms');
    const appWrapper = document.getElementById('app-wrapper');
    const discovery = document.getElementById('discovery');
    const chatScreen = document.getElementById('chat-screen');
    const userProfile = document.getElementById('user-profile');
    const explorationScreen = document.getElementById('exploration-screen');
    const settingsScreen = document.getElementById('settings-screen');
    const likesScreen = document.getElementById('likes-screen');
    const messagesListScreen = document.getElementById('messages-list-screen');
    const profileDetailsScreen = document.getElementById('profile-details-screen');
    const profileEditScreen = document.getElementById('profile-edit-screen');
    const signupScreen = document.getElementById('signup-screen');
    const loginScreen = document.getElementById('login-screen');
    const otpScreen = document.getElementById('otp-screen');
    const endView = document.getElementById('end-view');
    const matchOverlay = document.getElementById('match-overlay');
    const toast = document.getElementById('notification-toast');

    // Controls
    const btnEnter = document.getElementById('btn-enter-app');
    const btnToPerms = document.getElementById('btn-to-permissions');
    const btnFinishOnboarding = document.getElementById('btn-finish-onboarding');
    const btnCreateAccount = document.getElementById('btn-create-account');
    const btnSubmitSignup = document.getElementById('btn-submit-signup');
    const btnBackSignup = document.getElementById('btn-back-signup');
    const btnLoginPhone = document.getElementById('btn-login-phone');
    const btnBackLogin = document.getElementById('btn-back-login');
    const btnRequestOtp = document.getElementById('btn-request-otp');
    const btnBackOtp = document.getElementById('btn-back-otp');
    const btnChangeNumber = document.getElementById('btn-change-number');
    const otpDigits = document.querySelectorAll('.otp-digit');
    const intentCards = document.querySelectorAll('.intent-card');

    // Discovery Logic
    const profileCard = document.getElementById('profile-interaction');
    const vibeMarker = document.getElementById('vibe-marker');
    const skipMarker = document.getElementById('skip-marker');
    const profileImage = document.getElementById('profile-image');
    const profileName = document.getElementById('profile-name');
    const profileLocation = document.getElementById('profile-location');
    const profileVibe = document.getElementById('profile-vibe');

    // Navigation Buttons
    const btnTopProfile = document.getElementById('btn-top-profile');
    const btnTopSettings = document.getElementById('btn-top-settings');
    const btnSaveProfile = document.getElementById('btn-save-profile');
    const btnOpenSettings = document.getElementById('btn-open-settings');
    const btnCloseSettings = document.getElementById('btn-close-settings');

    // Exploration & Chat controls
    const toggleList = document.getElementById('toggle-list');
    const toggleMap = document.getElementById('toggle-map');
    const viewSuggestions = document.getElementById('view-suggestions');
    const viewMap = document.getElementById('view-map');
    const filterChips = document.querySelectorAll('.filter-chip');
    const chatInput = document.getElementById('chat-input-field');
    const btnSend = document.getElementById('btn-send-msg');
    const msgContainer = document.getElementById('msg-container');
    const btnCloseChat = document.getElementById('btn-close-chat');
    const timerVal = document.getElementById('timer-val');
    const btnSecurityToggle = document.getElementById('btn-security-toggle');
    const securityMenu = document.getElementById('security-menu');

    // Match Overlay Controls
    const btnMatchChat = document.getElementById('btn-match-chat');
    const btnMatchContinue = document.getElementById('btn-match-continue');
    const btnCloseDetails = document.getElementById('btn-close-details');
    const btnDetailSkip = document.getElementById('btn-detail-skip');
    const btnDetailVibe = document.getElementById('btn-detail-vibe');

    // Navigation Bars
    const mainNav = document.getElementById('main-nav');
    const navItems = document.querySelectorAll('.nav-item');

    // Initial State
    if (mainNav) mainNav.classList.add('hidden');

    // Section Reference Helper
    const allSections = () => [
        discovery, explorationScreen, likesScreen, messagesListScreen,
        userProfile, settingsScreen, chatScreen, endView, profileDetailsScreen
    ];

    // Notification State
    const notifSettings = {
        pushMatch: true,
        pushMessage: true,
        pushNearby: true,
        emailActivity: false,
        emailUpdates: true
    };

    // Mock Data
    const profiles = [
        {
            name: "Inès", dist: "1.2km", vibe: "Éclat nocturne 🌙", img: "assets/images/ines.png",
            images: ["assets/images/ines.png", "assets/images/ines.png", "assets/images/ines.png"],
            bio: "Passionnée par la mode et l'architecture. J'aime les conversations profondes devant un espresso martini. 🍸",
            daily: "En ce moment, je dévore des livres sur le Bauhaus et je cherche le meilleur rooftop de la ville.",
            tags: ["Mode", "Archi", "Cocktails"],
            details: { height: "1m72", study: "Master en Design", smoke: "Non fumer", contact: "@ines_flow" }
        },
        {
            name: "Chloé", dist: "0.8km", vibe: "Douceur solaire ☀️", img: "assets/images/chloe.png",
            images: ["assets/images/chloe.png", "assets/images/chloe.png"],
            bio: "Toujours à la recherche du meilleur spot pour voir le coucher du soleil. Voyageuse dans l'âme. ✈️",
            daily: "Yoga le matin, rando le week-end. Je vis au rythme du soleil.",
            tags: ["Voyage", "Nature", "Sunset"],
            details: { height: "1m65", study: "Lettres Modernes", smoke: "Occasionnel", contact: "06 12 34 .. .." }
        },
        {
            name: "Maya", dist: "2.5km", vibe: "Énergie sauvage 🌿", img: "assets/images/maya.png",
            images: ["assets/images/maya.png", "assets/images/maya.png", "assets/images/maya.png"],
            bio: "Amoureuse de la nature et photographe amateur. Ma vibe ? Spontanéité et sincérité. 📸",
            daily: "Développement de pellicules et cueillette sauvage.",
            tags: ["Photo", "Rando", "Bio"],
            details: { height: "1m70", study: "Arts Appliqués", smoke: "Non", contact: "@maya_wild" }
        },
        {
            name: "Jade", dist: "1.5km", vibe: "Minimalisme urbain 🏙️", img: "assets/images/jade.png",
            images: ["assets/images/jade.png", "assets/images/jade.png"],
            bio: "Adepte du 'less is more'. J'aime le design, les musées d'art moderne et les balades en ville à minuit.",
            daily: "Minimalisme digital et caféine pure.",
            tags: ["Art", "Design", "Midnight"],
            details: { height: "1m68", study: "Architecture", smoke: "Parfois", contact: "@jade_minimal" }
        },
        {
            name: "Sofia", dist: "2.4km", vibe: "Élégance pure 💎", img: "assets/images/sofia.png",
            images: ["assets/images/sofia.png", "assets/images/sofia.png"],
            bio: "Style classique, esprit moderne. J'apprécie les belles choses simples et les échanges intellectuels.",
            daily: "Opéra, vin de presse et discussions sans fin.",
            tags: ["Style", "Opera", "Wine"],
            details: { height: "1m75", study: "Sciences Po", smoke: "Non", contact: "@sofia_lux" }
        },
        {
            name: "Ambre", dist: "0.6km", vibe: "Confidence audacieuse 🖤", img: "assets/images/ambre.png",
            images: ["assets/images/ambre.png", "assets/images/ambre.png"],
            bio: "Je sais ce que je veux. Passionnée par le fitness et les défis. Let's vibe or not. 🔥",
            daily: "Training intensif et playlist technn.",
            tags: ["Sport", "Power", "Black"],
            details: { height: "1m70", study: "Management Sportif", smoke: "Non", contact: "07 88 .. .. .." }
        },
        {
            name: "Lila", dist: "1.2km", vibe: "Sourire authentique 😊", img: "assets/images/lila.png",
            images: ["assets/images/lila.png"],
            bio: "Simple, drôle et sans filtre. On se prend un café et on refait le monde ? ☕️",
            daily: "Humour décalé et brunchs interminables.",
            tags: ["Coffee", "Laugh", "Real"],
            details: { height: "1m62", study: "Psychologie", smoke: "Non", contact: "@lila_smile" }
        },
        {
            name: "Luna", dist: "2.9km", vibe: "Vibe futuriste 🪐", img: "assets/images/luna.png",
            images: ["assets/images/luna.png", "assets/images/luna.png"],
            bio: "Geek et fashionista. Fan de SF, de tech et de néons. Le futur est déjà là. 👾",
            daily: "Coding et shopping vintage intergalactique.",
            tags: ["Tech", "SF", "Neon"],
            details: { height: "1m64", study: "Informatique", smoke: "Vape", contact: "@luna_tech" }
        },
        {
            name: "Zoe", dist: "1.7km", vibe: "Esprit créatif 🎨", img: "assets/images/zoe.png",
            images: ["assets/images/zoe.png", "assets/images/zoe.png"],
            bio: "Peintre à mes heures perdues. Ma vie est une toile en constante évolution. 🖌️",
            daily: "Expositions éphémères et peinture à l'huile.",
            tags: ["Art", "Color", "Dream"],
            details: { height: "1m67", study: "Beaux-Arts", smoke: "Non", contact: "@zoe_paint" }
        }
    ];
    let currentProfileIndex = 0;
    const sessionLimit = 20;
    let profilesSeen = 0;

    let sentLikes = [];
    let receivedLikes = [
        { name: "Sofia", img: "assets/images/sofia.png", vibe: "A vibré pour toi ✨", time: "Il y a 2h" },
        { name: "Inès", img: "assets/images/ines.png", vibe: "Résonance proche 🌀", time: "Il y a 5h" },
        { name: "Ambre", img: "assets/images/ambre.png", vibe: "Vibe partagée 🔥", time: "Il y a 12h" }
    ];

    let conversations = [
        {
            name: "Inès",
            img: "assets/images/ines.png",
            lastMsg: "On se retrouve pour cet espresso martini ? 🍸",
            time: "12h 05m",
            unread: true,
            online: true
        }
    ];

    // --- UTILITIES ---
    const transitionScreens = (from, to, showNav = true) => {
        if (from === to) return;

        // 1. Handle Navigation Visibility IMMEDIATELY
        const hideNavOn = ['user-profile', 'settings-screen', 'chat-screen', 'end-view', 'profile-edit-screen', 'signup-screen', 'login-screen', 'otp-screen'];
        const shouldHideNav = hideNavOn.includes(to.id) || !showNav;

        if (shouldHideNav) {
            mainNav.classList.add('hidden');
            document.body.classList.add('nav-hidden');
        }

        // 2. Start Exit Animation
        from.style.opacity = '0';

        // 3. Complete Transition after delay
        setTimeout(() => {
            from.classList.add('hidden');
            to.classList.remove('hidden');
            to.style.opacity = '0';
            to.offsetHeight; // force reflow
            to.style.opacity = '1';
            to.classList.add('step-transition');

            // 4. Restore Navigation if needed (with slight delay for visual smoothness)
            if (!shouldHideNav) {
                mainNav.classList.remove('hidden');
                document.body.classList.remove('nav-hidden');
                mainNav.style.opacity = '1';
            }

            // 5. Scroll to top
            const container = document.querySelector('.container');
            if (container) container.scrollTop = 0;
        }, 400);
    };

    const showToast = (title, body, icon = "✨") => {
        const tIcon = toast.querySelector('.notif-icon');
        const tTitle = toast.querySelector('#notif-title');
        const tBody = toast.querySelector('#notif-body');

        if (tIcon) tIcon.textContent = icon;
        if (tTitle) tTitle.textContent = title;
        if (tBody) tBody.textContent = body;

        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 4000);
    };

    // --- NOTIFICATION SYSTEM ---
    const triggerNearbyVibe = () => {
        if (notifSettings.pushNearby && Math.random() > 0.8) {
            const vibes = [
                "Une vibe 'Chill' vient d'apparaître à 500m.",
                "Quelqu'un résonne avec ton énergie à proximité.",
                "Un nouveau moment 'Casual' palpite près de toi."
            ];
            const randomVibe = vibes[Math.floor(Math.random() * vibes.length)];
            showToast("Vibe proche", randomVibe, "📍");
        }
    };
    setInterval(triggerNearbyVibe, 45000);

    // --- APP FLOW LOGIC ---
    if (btnEnter) btnEnter.addEventListener('click', () => {
        transitionScreens(landing, loginScreen, false);
    });

    if (btnBackLogin) btnBackLogin.addEventListener('click', () => {
        transitionScreens(loginScreen, landing, false);
    });

    // Social Login
    const btnLoginApple = document.getElementById('btn-login-apple');
    const btnLoginFacebook = document.getElementById('btn-login-facebook');
    const mockSocialLogin = (provider) => {
        showToast("Bienvenue !", "Prends ton temps.", "✨");
        setTimeout(() => {
            // Reset Onboarding State
            if (onboardingIntent) onboardingIntent.classList.remove('hidden');
            if (onboardingProfile) onboardingProfile.classList.add('hidden');
            if (onboardingPrelude) onboardingPrelude.classList.add('hidden');
            if (onboardingProgress) onboardingProgress.style.width = "25%";

            transitionScreens(loginScreen, onboardingFlow, true);
        }, 1000);
    };
    if (btnLoginApple) btnLoginApple.addEventListener('click', () => mockSocialLogin("Apple"));
    if (btnLoginFacebook) btnLoginFacebook.addEventListener('click', () => mockSocialLogin("Facebook"));

    if (btnRequestOtp) btnRequestOtp.addEventListener('click', () => {
        const phoneInput = document.getElementById('login-phone-input');
        // Basic validation
        if (phoneInput && phoneInput.value.length > 5) {
            transitionScreens(loginScreen, otpScreen, false);
            setTimeout(() => { if (otpDigits.length > 0) otpDigits[0].focus(); }, 500);
        } else {
            showToast("Incomplet", "Entrez un numéro valide.", "⚠️");
        }
    });

    if (btnBackOtp) btnBackOtp.addEventListener('click', () => {
        transitionScreens(otpScreen, loginScreen, false);
    });

    if (btnChangeNumber) btnChangeNumber.addEventListener('click', () => {
        transitionScreens(otpScreen, loginScreen, false);
    });

    // OTP Interaction Logic
    otpDigits.forEach((digit, idx) => {
        digit.addEventListener('input', (e) => {
            if (e.target.value.length >= 1) {
                if (idx < otpDigits.length - 1) {
                    otpDigits[idx + 1].focus();
                } else {
                    // Last digit -> Validate
                    digit.blur();
                    const status = document.getElementById('otp-status');
                    if (status) {
                        status.innerText = "Validation...";
                        status.style.color = "var(--accent-lilas)";
                    }
                    setTimeout(() => {
                        if (status) {
                            status.innerText = "Succès";
                            status.style.color = "#4CAF50";
                        }
                        showToast("Bienvenue !", "Prends ton temps.", "✨");
                        setTimeout(() => {
                            // Reset Onboarding State
                            if (onboardingIntent) onboardingIntent.classList.remove('hidden');
                            if (onboardingProfile) onboardingProfile.classList.add('hidden');
                            if (onboardingPrelude) onboardingPrelude.classList.add('hidden');
                            if (onboardingProgress) onboardingProgress.style.width = "25%";

                            transitionScreens(otpScreen, onboardingFlow, true);
                        }, 800);
                    }, 1000);
                }
            }
        });
        digit.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && idx > 0) {
                otpDigits[idx - 1].focus();
            }
        });
    });

    if (btnCreateAccount) btnCreateAccount.addEventListener('click', () => {
        transitionScreens(landing, signupScreen, false);
    });

    // Old Back Handler Removed - Handled in Progressive Logic below


    // --- PROGRESSIVE SIGNUP LOGIC ---
    const signupSteps = Array.from(document.querySelectorAll('.signup-step'));
    const stepDots = Array.from(document.querySelectorAll('.step-dot'));
    let currentStepIndex = 0;

    const updateSignupState = () => {
        stepDots.forEach((dot, idx) => dot.classList.toggle('active', idx <= currentStepIndex));
        signupSteps.forEach((step, idx) => {
            step.classList.toggle('active', idx === currentStepIndex);
        });
    };

    // Next Buttons
    document.querySelectorAll('.btn-next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('disabled')) return;
            const nextId = btn.dataset.next;
            const nextStep = document.getElementById(nextId);
            if (nextStep) {
                const nextIndex = signupSteps.indexOf(nextStep);
                if (nextIndex !== -1) {
                    currentStepIndex = nextIndex;
                    updateSignupState();
                }
            }
        });
    });

    // Custom Back Button for Signup
    if (btnBackSignup) {
        // We override the default behavior by cloning to remove old listeners if any, or just define specific logic
        // Since we removed the old listener above, we can just add new one.
        btnBackSignup.addEventListener('click', () => {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                updateSignupState();
            } else {
                transitionScreens(signupScreen, landing, false);
            }
        });
    }

    // Step 1: Phone Validation
    const signupPhone = document.getElementById('signup-phone');
    if (signupPhone) {
        signupPhone.addEventListener('input', (e) => {
            const btn = document.querySelector('#step-contact .btn-next-step');
            if (btn) e.target.value.length > 8 ? btn.classList.remove('disabled') : btn.classList.add('disabled');
        });
    }

    // Step 2 & 3: Selection
    document.querySelectorAll('.select-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const parent = opt.closest('.selection-grid');
            parent.querySelectorAll('.select-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');

            const step = opt.closest('.signup-step');
            const btn = step.querySelector('.btn-next-step');
            if (btn) btn.classList.remove('disabled');
        });
    });

    // Step 4: Geo
    const btnGeoBig = document.querySelector('.btn-geo-big');
    if (btnGeoBig) {
        btnGeoBig.addEventListener('click', () => {
            showToast("Géolocalisation", "Position trouvée : Lyon", "📍");
            const step = document.getElementById('step-location');
            const btn = step.querySelector('.btn-next-step');
            if (btn) btn.classList.remove('disabled');
        });
    }

    // Step 5: Final Creation
    const chkConsentFinal = document.getElementById('chk-consent-final');
    const btnFinalCreate = document.getElementById('btn-final-create');

    if (chkConsentFinal && btnFinalCreate) {
        chkConsentFinal.addEventListener('change', (e) => {
            e.target.checked ? btnFinalCreate.classList.remove('disabled') : btnFinalCreate.classList.add('disabled');
        });

        btnFinalCreate.addEventListener('click', () => {
            showToast("Compte créé", "Bienvenue sur Despacío.", "✨");
            setTimeout(() => {
                // To Onboarding Flow
                signupScreen.classList.add('hidden');
                onboardingFlow.classList.remove('hidden');

                // Reset/Ensure Intent is first (New Request)
                const intentScreen = document.getElementById('onboarding-intent');
                const profileScreen = document.getElementById('onboarding-profile');
                if (intentScreen) intentScreen.classList.remove('hidden');
                if (profileScreen) profileScreen.classList.add('hidden');

                const progress = document.getElementById('onboarding-progress');
                if (progress) progress.style.width = '25%';
            }, 1000);
        });
    }

    // --- NEW ONBOARDING FLOW LOGIC ---
    // Variables already declared at top or repurposed:
    // onboardingFlow, onboardingIntent are global.
    const onboardingProfile = document.getElementById('onboarding-profile');
    const onboardingPrelude = document.getElementById('onboarding-prelude');
    const onboardingProgress = document.getElementById('onboarding-progress');

    // Intent Screen Buttons
    const btnToProfile = document.getElementById('btn-to-profile');
    const btnSkipIntent = document.getElementById('btn-skip-intent');

    // Profile Screen Buttons
    const btnToPrelude = document.getElementById('btn-to-prelude');
    const btnSkipPhoto = document.getElementById('btn-skip-photo');
    const btnUploadPhoto = document.getElementById('btn-upload-photo');
    const profilePreviewImg = document.getElementById('profile-preview-img');
    const uploadIcon = document.getElementById('upload-icon');

    // Prelude Screen Buttons
    const btnStartDiscovery = document.getElementById('btn-start-discovery');

    // Intent Selection
    document.querySelectorAll('.intent-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.intent-card').forEach(c => c.style.border = 'none'); // Reset
            card.style.border = '1px solid var(--accent-lilas)';
        });
    });

    const goToProfile = () => {
        transitionScreens(onboardingIntent, onboardingProfile, true);
        if (onboardingProgress) onboardingProgress.style.width = "50%";
    };

    if (btnToProfile) btnToProfile.addEventListener('click', goToProfile);
    if (btnSkipIntent) btnSkipIntent.addEventListener('click', goToProfile);

    const goToPrelude = () => {
        transitionScreens(onboardingProfile, onboardingPrelude, true);
        if (onboardingProgress) onboardingProgress.style.width = "75%";
    };

    if (btnToPrelude) btnToPrelude.addEventListener('click', goToPrelude);
    if (btnSkipPhoto) btnSkipPhoto.addEventListener('click', goToPrelude);

    // Photo Upload (Mock)
    if (btnUploadPhoto) {
        btnUploadPhoto.addEventListener('click', () => {
            const mockPhotos = ["assets/images/landing_hero_1.jpg", "assets/images/ines.png", "assets/images/landing_hero_2.jpg"];
            const randomPhoto = mockPhotos[Math.floor(Math.random() * mockPhotos.length)];
            if (uploadIcon) uploadIcon.style.display = 'none';
            if (profilePreviewImg) {
                profilePreviewImg.src = randomPhoto;
                profilePreviewImg.style.display = 'block';
            }
        });
    }

    if (btnStartDiscovery) {
        btnStartDiscovery.addEventListener('click', () => {
            // Go To App
            onboardingFlow.classList.add('hidden');
            discovery.classList.remove('hidden');
        });
    }

    // --- ONBOARDING PROFILE LOGIC ---
    // The previous onboardingProfile logic has been refactored and moved into the NEW ONBOARDING FLOW LOGIC section above.
    // The following variables and event listeners are now part of the new flow or are no longer needed in their old form.
    // const onboardingProfile = document.getElementById('onboarding-profile'); // Defined above
    // const btnToIntent = document.getElementById('btn-to-intent'); // Replaced by btnToProfile
    const firstNameInput = document.getElementById('onboarding-firstname');
    const ageInput = document.getElementById('onboarding-age');
    // const btnUploadPhoto = document.getElementById('btn-upload-photo'); // Defined above
    // const profilePreviewImg = document.getElementById('profile-preview-img'); // Defined above
    // const uploadIcon = document.getElementById('upload-icon'); // Defined above

    let isPhotoUploaded = false; // This state might need to be managed within the new flow

    const validateProfile = () => {
        // This validation logic should be integrated into the new onboarding profile step
        // to enable/disable btnToPrelude
        if (firstNameInput && ageInput && firstNameInput.value.length > 1 && ageInput.value.length > 1 && isPhotoUploaded) {
            if (btnToPrelude) btnToPrelude.classList.remove('disabled');
        } else {
            if (btnToPrelude) btnToPrelude.classList.add('disabled');
        }
    };

    if (firstNameInput) firstNameInput.addEventListener('input', validateProfile);
    if (ageInput) ageInput.addEventListener('input', validateProfile);

    // The btnUploadPhoto listener is now defined in the NEW ONBOARDING FLOW LOGIC section
    // if (btnUploadPhoto) {
    //     btnUploadPhoto.addEventListener('click', () => {
    //         // Simulate Photo Upload
    //         const mockPhotos = ["assets/images/landing_hero_1.jpg", "assets/images/ines.png", "assets/images/landing_hero_2.jpg"];
    //         const randomPhoto = mockPhotos[Math.floor(Math.random() * mockPhotos.length)];

    //         if (uploadIcon) uploadIcon.style.display = 'none';
    //         if (profilePreviewImg) {
    //             profilePreviewImg.src = randomPhoto;
    //             profilePreviewImg.style.display = 'block';
    //         }
    //         isPhotoUploaded = true;
    //         validateProfile();
    //     });
    // }

    // The btnToIntent listener is replaced by btnToProfile and btnSkipIntent
    // if (btnToIntent) {
    //     btnToIntent.addEventListener('click', () => {
    //         transitionScreens(onboardingProfile, onboardingIntent, true);
    //         const progress = document.getElementById('onboarding-progress');
    //         if (progress) progress.style.width = '45%';
    //     });
    // }

    if (btnToPerms) btnToPerms.addEventListener('click', () => {
        transitionScreens(onboardingIntent, onboardingPerms);
        const progress = document.getElementById('onboarding-progress');
        if (progress) progress.style.width = '66%';
    });

    if (btnFinishOnboarding) btnFinishOnboarding.addEventListener('click', () => {
        const progress = document.getElementById('onboarding-progress');
        if (progress) progress.style.width = '100%';
        setTimeout(() => {
            transitionScreens(onboardingFlow, appWrapper);
            if (notifSettings.pushNearby) showToast("Bienvenue", "Laisse les moments venir à toi. Sans pression.", "🌊");
        }, 300);
    });

    // Intent Selection Logic
    intentCards.forEach(card => {
        card.addEventListener('click', () => {
            intentCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    if (btnTopProfile) btnTopProfile.addEventListener('click', () => transitionScreens(discovery, userProfile, false));
    if (btnSaveProfile) btnSaveProfile.addEventListener('click', () => transitionScreens(userProfile, discovery, true));

    if (btnTopSettings) btnTopSettings.addEventListener('click', () => transitionScreens(discovery, settingsScreen, true));
    if (btnOpenSettings) btnOpenSettings.addEventListener('click', () => transitionScreens(userProfile, settingsScreen, true));
    if (btnCloseSettings) btnCloseSettings.addEventListener('click', () => transitionScreens(settingsScreen, userProfile, false));

    // --- MAIN NAVIGATION LOGIC ---
    const getActiveSection = () => allSections().find(s => !s.classList.contains('hidden'));

    // Tab Switching Logic
    const setupTabs = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return;
        const tabBtns = section.querySelectorAll('.tab-btn');
        const tabContents = section.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                if (btn.classList.contains('active')) return;

                // Simple Haptic effect
                btn.classList.add('scale-tap');
                setTimeout(() => btn.classList.remove('scale-tap'), 200);

                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                tabContents.forEach(content => {
                    content.style.opacity = '0';
                    setTimeout(() => {
                        if (content.id === `tab-${targetTab}`) {
                            content.classList.remove('hidden');
                            setTimeout(() => content.style.opacity = '1', 50);
                        } else {
                            content.classList.add('hidden');
                        }
                    }, 200);
                });
            });
        });
    };

    setupTabs('likes-screen');
    setupTabs('messages-list-screen');

    const renderLikes = () => {
        const receivedGrid = document.querySelector('#tab-received .suggested-grid');
        const sentGrid = document.querySelector('#tab-sent .suggested-grid');

        if (receivedGrid) {
            receivedGrid.innerHTML = receivedLikes.map(p => `
                <div class="suggestion-card blurred">
                    <img src="${p.img}" class="suggestion-img">
                    <div class="suggestion-info">
                        <div class="suggestion-name">${p.name}</div>
                        <div class="suggestion-vibe">${p.vibe}</div>
                        <div style="font-size: 0.6rem; color: var(--text-dim); margin-top: 4px;">${p.time}</div>
                    </div>
                </div>
            `).join('');
        }

        if (sentGrid) {
            if (sentLikes.length === 0) {
                sentGrid.innerHTML = `
                    <div style="grid-column: 1/-1; padding: 4rem 2rem; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.3;">✨</div>
                        <p style="color: var(--text-dim); font-size: 0.85rem;">Tes vibrations apparaîtront ici dès que tu auras cliqué sur ✨.</p>
                    </div>
                `;
            } else {
                sentGrid.innerHTML = sentLikes.map(p => `
                    <div class="suggestion-card">
                        <img src="${p.img}" class="suggestion-img">
                        <div class="suggestion-info">
                            <div class="suggestion-name">${p.name}</div>
                            <div class="suggestion-vibe">En attente de résonance...</div>
                        </div>
                    </div>
                `).join('');
            }
        }
    };

    const renderConversations = () => {
        const list = document.querySelector('.messages-list');
        if (!list) return;

        if (conversations.length === 0) {
            list.innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem; opacity: 0.3;">
                    <span style="font-size: 2rem;">💬</span>
                    <p style="margin-top: 1rem; font-size: 0.85rem;">Pas encore de mots échangés.<br>Laisse la vibe opérer.</p>
                </div>
            `;
            return;
        }

        list.innerHTML = conversations.map(c => `
            <div class="message-item" onclick="openChat('${c.name}')">
                <div class="chat-circle-avatar" style="width: 54px; height: 54px; position: relative;">
                    <img src="${c.img}" alt="${c.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                    ${c.online ? `<div class="status-dot-active" style="position: absolute; bottom: 2px; right: 2px; border: 2px solid var(--bg-card-solid);"></div>` : ''}
                </div>
                <div class="message-item-details" style="flex: 1; margin-left: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <h4 style="font-size: 1rem; font-weight: ${c.unread ? '600' : '400'}; color: ${c.unread ? 'white' : 'var(--text-muted)'};">${c.name}</h4>
                        <span style="font-size: 0.65rem; color: var(--accent-peche);">${c.time}</span>
                    </div>
                    <p style="font-size: 0.8rem; color: ${c.unread ? 'white' : 'var(--text-dim)'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; ${c.unread ? 'font-weight: 500;' : ''}">
                        ${c.lastMsg}
                    </p>
                </div>
                ${c.unread ? `<div style="width: 8px; height: 8px; background: var(--accent-lilas); border-radius: 50%; margin-left: 10px;"></div>` : ''}
            </div>
        `).join('');
    };

    // Mood Pill Logic
    const moodPills = document.querySelectorAll('.mood-pill');
    moodPills.forEach(pill => {
        pill.addEventListener('click', () => {
            moodPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            showToast("Mood", `Affichage des vibes : ${pill.textContent}`, "✨");
        });
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const current = getActiveSection();
            const targetId = item.getAttribute('data-target');
            let target = document.getElementById(targetId);

            // Special handling for Exploration sub-views
            if (targetId === 'exploration-screen-selection') {
                target = explorationScreen;
                toggleList.click(); // Switch to grid view
            } else if (targetId === 'exploration-screen-search') {
                target = explorationScreen;
                toggleMap.click(); // Switch to map view
            }

            if (target && current !== target) {
                navItems.forEach(ni => ni.classList.remove('active'));
                item.classList.add('active');

                if (targetId === 'likes-screen') renderLikes();
                if (targetId === 'messages-list-screen') renderConversations();

                transitionScreens(current, target, true);
            }
        });
    });

    // Alias for opening profile button from top nav
    if (document.getElementById('btn-close-profile')) {
        document.getElementById('btn-close-profile').addEventListener('click', () => transitionScreens(userProfile, discovery, true));
    }
    if (document.getElementById('btn-close-exploration')) {
        document.getElementById('btn-close-exploration').addEventListener('click', () => transitionScreens(explorationScreen, discovery, true));
    }

    // --- PROFILE DETAILS & INTERACTORS ---
    const showProfileDetails = (p) => {
        if (!p) return;

        const current = getActiveSection();
        const photosContainer = document.getElementById('detail-photos');
        const dotsContainer = document.getElementById('detail-dots');
        const name = document.getElementById('detail-name');
        const vibe = document.getElementById('detail-vibe');
        const bio = document.getElementById('detail-bio');
        const daily = document.getElementById('detail-daily');
        const interestsContainer = document.getElementById('detail-interests');

        const infoDist = document.getElementById('info-dist');
        const infoHeight = document.getElementById('info-height');
        const infoStudy = document.getElementById('info-study');
        const infoSmoke = document.getElementById('info-smoke');
        const btnContact = document.getElementById('btn-contact-action');

        // Render Photos
        if (photosContainer) {
            const photoList = p.images || [p.img];
            photosContainer.innerHTML = photoList.map(src => `<img src="${src}" alt="${p.name}">`).join('');

            // Sync Dots
            if (dotsContainer) {
                dotsContainer.innerHTML = photoList.map((_, i) => `<div class="dot-indicator ${i === 0 ? 'active' : ''}"></div>`).join('');
                photosContainer.onscroll = () => {
                    const idx = Math.round(photosContainer.scrollLeft / photosContainer.offsetWidth);
                    const dots = dotsContainer.querySelectorAll('.dot-indicator');
                    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
                };
            }
        }

        if (name) name.textContent = p.name;
        if (vibe) vibe.textContent = p.vibe;
        if (bio) bio.textContent = p.bio || "Le mystère reste entier...";
        if (daily) daily.textContent = p.daily || "Profite de chaque instant, sans routine.";

        if (infoDist) infoDist.textContent = p.dist;
        if (infoHeight) infoHeight.textContent = p.details?.height || "1m70";
        if (infoStudy) infoStudy.textContent = p.details?.study || "Études supérieures";
        if (infoSmoke) infoSmoke.textContent = p.details?.smoke || "Non fumer";

        if (btnContact) {
            btnContact.onclick = (e) => {
                e.preventDefault();
                showToast("Contact débloqué", p.details?.contact || "@contact", "📵");
            };
        }

        if (interestsContainer) {
            interestsContainer.innerHTML = '';
            if (p.tags) {
                p.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'detail-pill';
                    span.textContent = tag;
                    interestsContainer.appendChild(span);
                });
            }
        }

        // Reset dragging state if we were dragging
        isDragging = false;
        if (profileCard) {
            profileCard.style.transition = 'none';
            profileCard.style.transform = 'translateX(0) rotate(0)';
        }

        // Show screen
        transitionScreens(current, profileDetailsScreen, false);
    };

    if (profileCard) {
        profileCard.addEventListener('click', (e) => {
            // Only open if not clicking overlay info markers directly
            if (!e.target.closest('.profile-overlay')) {
                showProfileDetails(profiles[currentProfileIndex]);
            }
        });
    }

    // Secondary delegated click for overlay info (works for dynamic profiles)
    document.addEventListener('click', (e) => {
        const overlay = e.target.closest('.profile-overlay');
        if (overlay) {
            e.stopPropagation();
            showProfileDetails(profiles[currentProfileIndex]);
        }
    });


    if (btnCloseDetails) {
        btnCloseDetails.addEventListener('click', () => {
            transitionScreens(profileDetailsScreen, discovery, true);
        });
    }

    if (btnDetailSkip) {
        btnDetailSkip.addEventListener('click', () => {
            transitionScreens(profileDetailsScreen, discovery, true);
            nextProfile('skip');
        });
    }

    if (btnDetailVibe) {
        btnDetailVibe.addEventListener('click', () => {
            const p = profiles[currentProfileIndex];
            if (p && !sentLikes.find(l => l.name === p.name)) {
                sentLikes.unshift(p);
            }
            transitionScreens(profileDetailsScreen, discovery, true);
            setTimeout(() => nextProfile('vibe'), 500);
        });
    }

    // Suggested profiles click from Exploration
    document.addEventListener('click', (e) => {
        const suggestionCard = e.target.closest('.suggestion-card');
        if (suggestionCard && !suggestionCard.classList.contains('blurred')) {
            const nameEl = suggestionCard.querySelector('.suggestion-name');
            if (nameEl) {
                const nameText = nameEl.textContent.trim();
                console.log("Searching profile for:", nameText);
                const profile = profiles.find(p => p.name === nameText);
                if (profile) {
                    showProfileDetails(profile);
                } else {
                    console.warn("Profile not found for:", nameText);
                    // Fallback to name match partial
                    const pMatch = profiles.find(p => nameText.includes(p.name) || p.name.includes(nameText));
                    if (pMatch) showProfileDetails(pMatch);
                }
            }
        }
    });

    // --- SETTINGS LOGIC ---
    const setupToggle = (id, settingKey) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', (e) => {
                notifSettings[settingKey] = e.target.checked;
                const state = e.target.checked ? "activée" : "désactivée";
                showToast("Préférence", `La notification a été ${state}.`, "⚙️");
            });
        }
    };

    setupToggle('push-match', 'pushMatch');
    setupToggle('push-message', 'pushMessage');
    setupToggle('push-nearby', 'pushNearby');
    setupToggle('email-activity', 'emailActivity');
    setupToggle('email-updates', 'emailUpdates');

    // --- EXPLORATION ---
    if (toggleList) toggleList.addEventListener('click', () => {
        toggleList.classList.add('active'); toggleMap.classList.remove('active');
        viewSuggestions.classList.remove('hidden'); viewMap.classList.add('hidden');
    });
    if (toggleMap) toggleMap.addEventListener('click', () => {
        toggleMap.classList.add('active'); toggleList.classList.remove('active');
        viewMap.classList.remove('hidden'); viewSuggestions.classList.add('hidden');
    });
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active')); chip.classList.add('active');
            showToast("Filtre appliqué", `Exploration mise à jour.`, "🔍");
        });
    });

    // --- SWIPE LOGIC (SMOOTH V2) ---
    let startX = 0, currentX = 0, isDragging = false;

    const handleStart = (e) => {
        if (e.target.closest('.btn-action-round') || e.target.closest('.profile-info')) return;
        startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        isDragging = true;
        profileCard.classList.remove('spring-reset', 'fade-in-next');
        profileCard.style.transition = 'none'; // Instant follow
        if (securityMenu) securityMenu.classList.remove('visible');
    };

    const handleMove = (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent scrolling while swiping
        currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const diffX = currentX - startX;

        // Fluid rotation based on screen width ratio
        const rotation = diffX * 0.05;
        profileCard.style.transform = `translateX(${diffX}px) rotate(${rotation}deg)`;

        // Opacity markers feedback
        const opacity = Math.min(Math.abs(diffX) / 100, 1);
        if (diffX > 0) {
            vibeMarker.style.opacity = opacity;
            skipMarker.style.opacity = 0;
            profileCard.style.boxShadow = `0 20px 40px rgba(46, 204, 113, ${opacity * 0.2})`; // Greenish hint
        } else {
            skipMarker.style.opacity = opacity;
            vibeMarker.style.opacity = 0;
            profileCard.style.boxShadow = `0 20px 40px rgba(231, 76, 60, ${opacity * 0.2})`; // Reddish hint
        }
    };

    const handleEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = currentX - startX;
        const threshold = 120; // Lower threshold equals easier swipe

        if (diffX > threshold) swipeExit('right');
        else if (diffX < -threshold) swipeExit('left');
        else {
            // Reset with Spring Effect
            profileCard.classList.add('spring-reset');
            profileCard.style.transform = 'translateX(0) rotate(0)';
            profileCard.style.boxShadow = ''; // Reset shadow
            setTimeout(() => {
                vibeMarker.style.opacity = 0;
                skipMarker.style.opacity = 0;
            }, 100);
        }
    };

    if (profileCard) {
        profileCard.addEventListener('mousedown', handleStart);
        profileCard.addEventListener('touchstart', handleStart, { passive: false }); // pure passive false for preventDefault
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove, { passive: false });
        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchend', handleEnd);
    }

    const swipeExit = (direction) => {
        isDragging = false;
        profileCard.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s';
        profileCard.style.transform = `translateX(${direction === 'right' ? window.innerWidth : -window.innerWidth}px) rotate(${direction === 'right' ? 30 : -30}deg)`;
        profileCard.style.opacity = '0';

        const p = profiles[currentProfileIndex];
        if (direction === 'right') {
            if (p && !sentLikes.find(l => l.name === p.name)) sentLikes.unshift(p);
        }

        setTimeout(() => {
            if (direction === 'right' && Math.random() > 0.4) showMatch();
            else nextProfile();
        }, 300); // Faster transition to next
    };

    const nextProfile = () => {
        profilesSeen++;
        if (profilesSeen >= sessionLimit) {
            transitionScreens(discovery, endView);
            return;
        }
        currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
        const p = profiles[currentProfileIndex];

        // Reset Card State for Entrance
        profileCard.style.transition = 'none';

        // Update Content
        document.getElementById('profile-image').src = p.img;
        document.getElementById('profile-name').textContent = p.name;
        document.getElementById('profile-location').textContent = p.loc;
        document.getElementById('profile-vibe').textContent = `"${p.vibe}"`;

        // Apply Fade In Animation
        profileCard.classList.remove('spring-reset'); // safe clear

        // Force Reflow
        void profileCard.offsetWidth;

        profileCard.style.transform = 'translateX(0) rotate(0)';
        profileCard.style.opacity = '1';
        profileCard.style.boxShadow = '';

        // Add animation class
        profileCard.classList.add('fade-in-next');

        // Cleanup animation class after it runs
        setTimeout(() => {
            profileCard.classList.remove('fade-in-next');
        }, 500);

        vibeMarker.style.opacity = 0;
        skipMarker.style.opacity = 0;
    };

    // --- PROFILE EDIT LOGIC ---
    const setupEdit = (btnId, valId, type, updateHeader = false) => {
        const btn = document.getElementById(btnId);
        const val = document.getElementById(valId);
        if (btn && val) {
            btn.addEventListener('click', () => {
                // Determine current value
                let current = val.textContent.trim();
                if (type === "Bio") current = current.replace(/^"|"$/g, '');

                const newVal = prompt(`Modifier ${type} :`, current);

                if (newVal !== null && newVal.trim() !== "") {
                    // Update Value
                    if (type === "Bio") {
                        val.textContent = `"${newVal}"`;
                    } else {
                        val.textContent = newVal;
                    }

                    // Update Header Name if needed
                    if (updateHeader) {
                        const headerName = document.getElementById('val-header-name');
                        if (headerName) headerName.textContent = newVal;
                    }

                    showToast("Profil mis à jour", `${type} enregistré.`, "✏️");
                }
            });
        }
    };

    setupEdit('btn-edit-name', 'val-name', 'Nom', true);
    setupEdit('btn-edit-bio', 'val-bio', 'Bio');
    setupEdit('btn-edit-intent', 'val-intent', 'Intention');

    const btnEditAvatar = document.getElementById('btn-edit-avatar');
    if (btnEditAvatar) {
        btnEditAvatar.addEventListener('click', () => {
            if (confirm("Changer de photo de profil ? (Simulation)")) {
                const img = document.getElementById('img-avatar-user');
                if (img) {
                    // Toggle between two sample images for demo
                    const currentSrc = img.getAttribute('src');
                    img.src = currentSrc.includes('sample_profile') ? 'assets/images/jade.png' : 'assets/images/sample_profile.png';
                    showToast("Photo mise à jour", "Nouveau style appliqué.", "📷");
                }
            }
        });
    }

    const btnGlobalEdit = document.getElementById('btn-global-edit');
    if (btnGlobalEdit) {
        btnGlobalEdit.addEventListener('click', () => {
            transitionScreens(userProfile, profileEditScreen);
        });
    }

    const btnCloseEdit = document.getElementById('btn-close-edit');
    if (btnCloseEdit) {
        btnCloseEdit.addEventListener('click', () => {
            transitionScreens(profileEditScreen, userProfile);
        });
    }

    // --- MATCH & CHAT ---
    const showMatch = () => {
        if (notifSettings.pushMatch) showToast("Nouvelle résonance", "Quelqu'un vibre avec toi.", "❤️");
        matchOverlay.classList.add('visible');
    };
    if (btnMatchChat) btnMatchChat.addEventListener('click', () => {
        matchOverlay.classList.remove('visible');
        transitionScreens(discovery, chatScreen);
        startTimer(24 * 60 * 60);
    });
    if (btnMatchContinue) btnMatchContinue.addEventListener('click', () => {
        matchOverlay.classList.remove('visible');
        nextProfile();
    });

    if (btnSend) btnSend.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'sent');
            chatInput.value = '';
            setTimeout(() => {
                if (notifSettings.pushMessage) showToast("Message", "Ton match t'a envoyé une pensée.", "📩");
                addMessage("C'est noté. Prenons le temps de vibrer. ✨", 'received');
            }, 2500);
        }
    });

    function addMessage(text, type) {
        const b = document.createElement('div');
        b.className = `msg-bubble msg-${type} step-transition`;
        b.textContent = text;
        b.addEventListener('click', () => {
            if (confirm("Effacer ce message ?")) {
                b.style.opacity = '0';
                setTimeout(() => b.remove(), 600);
            }
        });
        msgContainer.appendChild(b);
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }
    if (btnSecurityToggle) btnSecurityToggle.addEventListener('click', () => securityMenu.classList.toggle('visible'));
    if (btnCloseChat) btnCloseChat.addEventListener('click', () => transitionScreens(chatScreen, discovery));

    let timerInt;
    const startTimer = (sec) => {
        let t = sec; clearInterval(timerInt);
        timerInt = setInterval(() => {
            let h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
            if (timerVal) timerVal.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            if (--t < 0) { clearInterval(timerInt); transitionScreens(chatScreen, endView); }
        }, 1000);
    };
    // [New] Back Button for Onboarding Intent
    const btnBackIntent = document.getElementById('btn-back-intent');
    if (btnBackIntent) {
        btnBackIntent.addEventListener('click', () => {
            // Access transitionScreens from closure scope
            const landing = document.getElementById('landing');
            const onboardingFlow = document.getElementById('onboarding-flow');
            transitionScreens(onboardingFlow, landing);
        });
    }

    // [New] Back Button for Onboarding Permissions
    const btnBackPerms = document.getElementById('btn-back-perms');
    if (btnBackPerms) {
        btnBackPerms.addEventListener('click', () => {
            const onboardingPerms = document.getElementById('onboarding-perms');
            const onboardingIntent = document.getElementById('onboarding-intent');
            const progress = document.getElementById('onboarding-progress');
            transitionScreens(onboardingPerms, onboardingIntent);
            if (progress) progress.style.width = '33%';
        });
    }

});
