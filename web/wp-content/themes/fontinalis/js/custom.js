(function() {
	
	gsap.registerPlugin(MotionPathPlugin,DrawSVGPlugin);
	
	const body = document.querySelector('body')
	
	const animateHeader = () => {
		const tl = gsap.timeline()
		tl.fromTo('.overlay ul li a', {autoAlpha:0, x:"20"}, {autoAlpha: 1, x: 0, stagger: 0.05, duration: 0.5, ease: "power2.out"}, 0)
	}
	
// 	Overlay
	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
		navLinks = document.querySelectorAll( '.overlay ul li a')
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
			
			animateHeader()
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
	
	navLinks.forEach(link => {
		link.addEventListener( 'click', toggleOverlay );
	})
	
// 	Header
	var header = document.querySelector("header#masthead");
	// construct an instance of Headroom, passing the element
	var headroom  = new Headroom(header);
	// initialise
	headroom.init();
	
	
	const teamMemberOverlays = () => {
		const teamMembers = document.querySelectorAll('.team-member-open')
		const bios = document.querySelectorAll('.bio')
		const memberNav = document.querySelectorAll('.member-nav-item')
		
		const memberOverlay = document.querySelector('.member-overlay')
		const exit = document.querySelector('.exit')
		
		if (teamMembers) {
			teamMembers.forEach(member => {
				member.addEventListener('click', function() {
				
					memberOverlay.setAttribute('aria-hidden', false)
					body.classList.toggle('noscroll')
					
					const name = this.dataset.name
					window.location.hash = name
					
					bios.forEach(bio => {
						gsap.set(bio , {opacity:0,display:'none'})  
						gsap.set(bio.querySelector('.team-member-name'), {x: 20, autoAlpha:0})
						gsap.set(bio.querySelector('.team-member-title'), {x: 20, autoAlpha:0})
						gsap.set(bio.querySelector('.team-member-office'), {x: 20, autoAlpha:0})
						gsap.set(bio.querySelector('.bio-content'), {y: 10, autoAlpha:0})
						
						if (bio.dataset.name === name) {
							gsap.to(bio, {autoAlpha:1,display:'block', duration: 0}) 
							gsap.to(bio.querySelector('.team-member-name'), {x: 0, autoAlpha:1, duration: 0.5, delay: 0.1 })
							gsap.to(bio.querySelector('.team-member-title'), {x: 0, autoAlpha:1, duration: 0.5, delay: 0.15})
							gsap.to(bio.querySelector('.team-member-office'), {x: 0, autoAlpha:1, duration: 0.5, delay: 0.2})
							gsap.to(bio.querySelector('.bio-content'), {y: 0, autoAlpha:1, duration: 0.4, delay: 0.2})
						}
					})
					
					memberNav.forEach(navItem => {
						if (navItem.dataset.name === name) {
							navItem.classList.add('active')
						} else {
							navItem.classList.remove('active')
						}
					})
					
					 memberOverlay.scrollTop = 0;
					
				})
			})
			
			memberNav.forEach(navItem => {
				navItem.addEventListener('click', function() {
					const name = this.dataset.name
					
					window.location.hash = name
					
					bios.forEach(bio => {
						gsap.set(bio , {opacity:0,display:'none'})  
						gsap.set(bio.querySelector('.team-member-name'), {x: 20, autoAlpha:0})
						gsap.set(bio.querySelector('.team-member-title'), {x: 20, autoAlpha:0})
						gsap.set(bio.querySelector('.team-member-office'), {x: 20, autoAlpha:0})
						gsap.set(bio.querySelector('.bio-content'), {y: 10, autoAlpha:0})
						
						if (bio.dataset.name === name) {
							gsap.to(bio, {autoAlpha:1,display:'block', duration: 0}) 
							
							gsap.to(bio.querySelector('.team-member-name'), {x: 0, autoAlpha:1, duration: 0.5, delay: 0.1 })
							gsap.to(bio.querySelector('.team-member-title'), {x: 0, autoAlpha:1, duration: 0.5, delay: 0.15})
							gsap.to(bio.querySelector('.team-member-office'), {x: 0, autoAlpha:1, duration: 0.5, delay: 0.2})
							gsap.to(bio.querySelector('.bio-content'), {y: 0, autoAlpha:1, duration: 0.4, delay: 0.2})
						}
					})
					
					memberNav.forEach(navItem => {
						if (navItem.dataset.name === name) {
							navItem.classList.add('active')
						} else {
							navItem.classList.remove('active')
						}
					})
					
					 memberOverlay.scrollTop = 0;
				})
			})
			
			if (window.location.hash) {
				console.log(window.location.hash.substring(1))
				
				const name = window.location.hash.substring(1)
				
				memberOverlay.setAttribute('aria-hidden', false)
				body.classList.toggle('noscroll')
				
				bios.forEach(bio => {
					gsap.set(bio , {opacity:0,display:'none'})  
					gsap.set(bio.querySelector('.team-member-name'), {x: 20, autoAlpha:0})
					gsap.set(bio.querySelector('.team-member-title'), {x: 20, autoAlpha:0})
					gsap.set(bio.querySelector('.team-member-office'), {x: 20, autoAlpha:0})
					gsap.set(bio.querySelector('.bio-content'), {y: 10, autoAlpha:0})
					
					if (bio.dataset.name === name) {
						gsap.to(bio, {autoAlpha:1,display:'block', duration: 0}) 
						gsap.to(bio.querySelector('.team-member-name'), {x: 0, autoAlpha:1, duration: 0.5, delay: 0.1 })
						gsap.to(bio.querySelector('.team-member-title'), {x: 0, autoAlpha:1, duration: 0.5, delay: 0.15})
						gsap.to(bio.querySelector('.team-member-office'), {x: 0, autoAlpha:1, duration: 0.5, delay: 0.2})
						gsap.to(bio.querySelector('.bio-content'), {y: 0, autoAlpha:1, duration: 0.4, delay: 0.2})
					}
				})
				
				memberNav.forEach(navItem => {
					if (navItem.dataset.name === name) {
						navItem.classList.add('active')
					} else {
						navItem.classList.remove('active')
					}
				})
				
				 memberOverlay.scrollTop = 0;
			}
			
			
			if (exit) {
				exit.addEventListener('click', function() {
					
					window.location.hash = ''
				
					memberOverlay.setAttribute('aria-hidden', true)
					body.classList.toggle('noscroll')
					
					bios.forEach(bio => {
						gsap.set(bio , {opacity:0,display:'none'})  
				
						gsap.set(bio.querySelector('.team-member-name'), {x: 20, autoAlpha:0})
						gsap.set(bio.querySelector('.team-member-title'), {x: 20, autoAlpha:0})
						gsap.set(bio.querySelector('.team-member-office'), {x: 20, autoAlpha:0})
						gsap.set(bio.querySelector('.bio-content'), {y: 20, autoAlpha:0})
					})
				
				})
			}
		}
	}
	
	
	
	const homeAnimation = () => {
		
		var hometl1, hometl2
		
		
		const circleAnim = {
			repeat: 15,
			duration: 8
		}
		

		function homestrat() {
			
				hometl1 = gsap.timeline({
				repeat: -1
				})
				
				hometl1.to(".dot1", {
				    motionPath: {
				        path: "#line1",
				        align: "#line1",
				        alignOrigin: [0.5, 0.5],
				        autoRotate: true
				    },
				    ease: "power3.in",
				    duration: circleAnim.duration
				});
				
				hometl1.to(".dot2", {
				    motionPath: {
				        path: "#line2",
				        align: "#line2",
				        alignOrigin: [0.5, 0.5],
				        autoRotate: true
				    },
				    ease: "power3.in",
				    duration: circleAnim.duration
				}, 3);
				
				hometl1.to(".dot3", {
				    motionPath: {
				        path: "#line3",
				        align: "#line3",
				        alignOrigin: [0.5, 0.5],
				        autoRotate: true
				    },
				    ease: "power3.in",
				    duration: circleAnim.duration
				}, 7);
				
				return hometl1
		}


		
		function homeintro() {
			
				hometl2 = gsap.timeline({
					repeat: -1
				})
				
				hometl2.to(".hi-dot1", {
				    motionPath: {
				        path: "#hi-1",
				        align: "#hi-1",
				        alignOrigin: [0.5, 0.5],
				        autoRotate: true
				    },
				    ease: "none",
				    duration: 15
				}, 0);
				hometl2.fromTo("#hi-1", { drawSVG: 0 }, {duration: 15, ease: "none", drawSVG: "100%" }, 0);
				
				hometl2.to(".hi-dot2", {
				    motionPath: {
				        path: "#hi-2",
				        align: "#hi-2",
				        alignOrigin: [0.5, 0.5],
				        autoRotate: true
				    },
				    ease: "none",
				    duration: 15
				}, 1);
				hometl2.fromTo("#hi-2", { drawSVG: 0 }, {duration: 15, ease: "none", drawSVG: "100%" }, 1);
				
				hometl2.to(".hi-dot3", {
				    motionPath: {
				        path: "#hi-3",
				        align: "#hi-3",
				        alignOrigin: [0.5, 0.5],
				        autoRotate: true
				    },
				    ease: "none",
				    duration: 15
				}, 2);
				hometl2.fromTo("#hi-3", { drawSVG: 0 }, {duration: 15, ease: "none", drawSVG: "100%" }, 2);
				
				hometl2.to(".hi-dot4", {
				    motionPath: {
				        path: "#hi-4",
				        align: "#hi-4",
				        alignOrigin: [0.5, 0.5],
				        autoRotate: true
				    },
				    ease: "none",
				    duration: 15
				}, 3);
				hometl2.fromTo("#hi-4", { drawSVG: 0 }, {duration: 15, ease: "none", drawSVG: "100%" }, 3);
				
				hometl2.to(".home-intro-graphic", {duration: 1, autoAlpha: 0}, 17);
			
				return hometl2
	
		}

		
		function resizeCheckHome(){
			const homeGraphic = document.querySelector('.home-intro-graphic')
			
			if (homeGraphic) {	
				  var progress1 = hometl1.progress(); //record the progress so that we can match it with the new tween (jump to the same spot)
				  hometl1.kill(); //rewind and kill the original tween.
				  homestrat().progress(progress1); //create a new tween based on the new size, and jump to the same progress value.
		 	}
			
			const homeStratGraphic = document.querySelector('.home-strategy-graphic')
			
			if (homeStratGraphic) {	
				  var progress2 = hometl2.progress(); //record the progress so that we can match it with the new tween (jump to the same spot)
				  hometl2.kill(); //rewind and kill the original tween.
				  homeintro().progress(progress2); //create a new tween based on the new size, and jump to the same progress value.
		 	}
		}
		
		const homeCheck = document.querySelector('.home-intro-graphic')
		
		if (homeCheck) {
			homestrat()
			homeintro().progress(0.25)
		}
		
		window.addEventListener("resize", resizeCheckHome)
	}
	
	const portAnimation = () => {
	
		const circleAnim = {
			repeat: 15,
			duration: 15
		}
		
		function portTranslate() {
			
			const detect = document.querySelector(".portfolio-graphic")
			
			if (detect) {
				
			MotionPathPlugin.convertToPath("circle.mainpath")
			
			porttl = gsap.timeline({
				repeat: -1
			})
			
			porttl.to(".port-dot1", {
			    motionPath: {
			        path: "#port-line1",
			        align: "#port-line1",
			        alignOrigin: [0.5, 0.5],
			        autoRotate: true
			    },
			    ease: "none",
			    duration: circleAnim.duration
			}, 0);
			
			porttl.to(".port-dot2", {
			    motionPath: {
			        path: "#port-line2",
			        align: "#port-line2",
			        alignOrigin: [0.5, 0.5],
			        start: 0.3, 
			        end: 1.3,
			        autoRotate: true
			    },
			    ease: "none",
			    duration: circleAnim.duration
			}, 0);
			
			porttl.to(".port-dot3", {
			    motionPath: {
			        path: "#port-line3",
			        align: "#port-line3",
			        start: 0.7, 
			        end: 1.7,
			        alignOrigin: [0.5, 0.5],
			        autoRotate: true
			    },
			    ease: "none",
			    duration: circleAnim.duration
			}, 0);
			
			}

		}
		
		window.addEventListener('resize', function() {
			
			const portdetect = document.querySelector(".portfolio-graphic")
			
			if (portdetect) {
			  porttl.kill();
			  portTranslate();
			  
			  }
		})
		
		const portdetect = document.querySelector(".portfolio-graphic")
			
		if (portdetect) {
		
			portTranslate()
		
		}
		
	}
	
	const stratAnimation = () => {
		const circleAnim = {
			repeat: 15,
			duration: 15
		}
		
		var strattl1, strattl2, strattl3, strattl4, strattl5, strattl6, strattl7
	
		
		function stratTimeline1() {
	
					strattl1 = gsap.timeline({
						delay: 2,
						repeat: -1
					})
					.from(".strat-dot1", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, 0)
					.to(".strat-dot1", {
					    motionPath: {
					        path: "#strat-line1",
					        align: "#strat-line1",
					        start: 0, 
							end: 1, 
					        alignOrigin: [0.5, 0.5],
					        autoRotate: true
					    },
				
					    duration: circleAnim.duration * 2
					}, 0)
					.to(".strat-dot1", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, circleAnim.duration)
/*
					.fromTo("#strat-line1", {
					  drawSVG:"100% 100%",
					  autoAlpha: 1
					},{
					  drawSVG:"0% 85%",
					  immediateRender:true,
					  duration: circleAnim.duration,
				
					}, 0)
*/
/*
					.to("#strat-line1", {
					  drawSVG:"0% 15%",
					  autoAlpha: 0,
					  duration: circleAnim.duration / 2
					}, circleAnim.duration)
*/
					
					return strattl1
				}
				
				function stratTimeline2() {
					strattl2 = gsap.timeline({
						delay: 6,
						repeat: -1
					})
					.from(".strat-dot2", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, 0)
					.to(".strat-dot2", {
					    motionPath: {
					        path: "#strat-line2",
					        align: "#strat-line2",
					        start: 1, 
							end: 0, 
					        alignOrigin: [0.5, 0.5],
					        autoRotate: true
					    },
				
					    duration: circleAnim.duration
					}, 0)
					.to(".strat-dot2", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, circleAnim.duration)
					.fromTo("#strat-line2", {
					  drawSVG:"100% 100%",
					  autoAlpha: 1
					},{
					  drawSVG:"0% 85%",
					  immediateRender:true,
					  duration: circleAnim.duration,
				
					}, 0)
					.to("#strat-line2", {
					  drawSVG:"0% 15%",
					  autoAlpha: 0,
					  duration: circleAnim.duration / 2
					}, circleAnim.duration)
					
					return strattl2
				}
				
				function stratTimeline4() {
					strattl4 = gsap.timeline({
						delay: 10,
						repeat: -1
					})
					.from(".strat-dot4", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, 0)
					.to(".strat-dot4", {
					    motionPath: {
					        path: "#strat-line4",
					        align: "#strat-line4",
					        start: 1, 
							end: 0, 
					        alignOrigin: [0.5, 0.5],
					        autoRotate: true
					    },
				
					    duration: circleAnim.duration
					}, 0)
					.to(".strat-dot4", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, circleAnim.duration)
					.fromTo("#strat-line4", {
					  drawSVG:"100% 100%",
					  autoAlpha: 1
					},{
					  drawSVG:"0% 85%",
					  immediateRender:true,
					  duration: circleAnim.duration,
				
					}, 0)
					.to("#strat-line4", {
					  drawSVG:"0% 15%",
					  autoAlpha: 0,
					  duration: circleAnim.duration / 2
					}, circleAnim.duration)
					
					return strattl4
				}
				
				function stratTimeline6() {
									
					strattl6 = gsap.timeline({
						delay: 8,
						repeat: -1
					})
					.from(".strat-dot6", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, 0)
					.to(".strat-dot6", {
					    motionPath: {
					        path: "#strat-line6",
					        align: "#strat-line6",
					        start: 1, 
							end: 0, 
					        alignOrigin: [0.5, 0.5],
					        autoRotate: true
					    },
				
					    duration: circleAnim.duration
					}, 0)
					.to(".strat-dot6", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, circleAnim.duration)
					.fromTo("#strat-line6", {
					  drawSVG:"100% 100%",
					  autoAlpha: 1
					},{
					  drawSVG:"0% 85%",
					  immediateRender:true,
					  duration: circleAnim.duration,
				
					}, 0)
					.to("#strat-line6", {
					  drawSVG:"0% 15%",
					  autoAlpha: 0,
					  duration: circleAnim.duration / 2
					}, circleAnim.duration)
					
					return strattl1
					
				}


// 				Reverse Timelines

			function stratTimeline3() {
				strattl3 = gsap.timeline({
						delay: 0.5,
						repeat: -1
					})
					.from(".strat-dot3", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, 0)
					.to(".strat-dot3", {
					    motionPath: {
					        path: "#strat-line3",
					        align: "#strat-line3",
					        start: 1, 
							end: 0, 
					        alignOrigin: [0.5, 0.5],
					        autoRotate: true
					    },
				
					    duration: circleAnim.duration * 2
					}, 0)
					.to(".strat-dot3", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, circleAnim.duration)
/*
					.fromTo("#strat-line3", {
					  drawSVG:"100% 100%",
					  autoAlpha: 1
					},{
					  drawSVG:"0% 85%",
					  immediateRender:true,
					  duration: circleAnim.duration,
				
					}, 0)
					.to("#strat-line3", {
					  drawSVG:"0% 15%",
					  autoAlpha: 0,
					  duration: circleAnim.duration / 2
					}, circleAnim.duration)
*/
					
					return strattl3
					
				}
				
				function stratTimeline5() {
				
				strattl5 = gsap.timeline({
						delay: 1,
						repeat: -1
					})
					.from(".strat-dot5", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, 0)
					.to(".strat-dot5", {
					    motionPath: {
					        path: "#strat-line5",
					        align: "#strat-line5",
					        start: 1, 
							end: 0, 
					        alignOrigin: [0.5, 0.5],
					        autoRotate: true
					    },
					 
					    duration: circleAnim.duration + 4
					}, 0)
					.to(".strat-dot5", {
						autoAlpha: 0, 
						scale: 0.5, 
						duration: 0.5
					}, circleAnim.duration)
					.fromTo("#strat-line5", {
					  drawSVG:"100% 100%",
					  autoAlpha: 1
					},{
					  drawSVG:"0% 85%",
					  immediateRender:true,
					  duration: circleAnim.duration + 4,
			
					}, 0)
					.to("#strat-line5", {
					  drawSVG:"0% 15%",
					  autoAlpha: 0,
					  duration: circleAnim.duration
					}, circleAnim.duration)
					
					return strattl5
					
				}
				
				function stratTimeline7() {
					
					strattl7 = gsap.timeline({
							delay: 0,
							repeat: -1
						})
						.from(".strat-dot7", {
							autoAlpha: 0, 
							scale: 0.5, 
							duration: 0.5
						}, 0)
						.to(".strat-dot7", {
						    motionPath: {
						        path: "#strat-line7",
						        align: "#strat-line7",
						        start: 1, 
								end: 0, 
						        alignOrigin: [0.5, 0.5],
						        autoRotate: true
						    },
					
						    duration: circleAnim.duration
						}, 0)
						.to(".strat-dot7", {
							autoAlpha: 0, 
							scale: 0.5, 
							duration: 0.5
						}, circleAnim.duration)
						.fromTo("#strat-line7", {
						  drawSVG:"100% 100%",
						  autoAlpha: 1
						},{
						  drawSVG:"0% 70%",
						  immediateRender:true,
						  duration: circleAnim.duration,
					
						}, 0)
						.to("#strat-line7", {
						  drawSVG:"0% 40%",
						  autoAlpha: 0,
						  duration: circleAnim.duration  / 2
						}, circleAnim.duration)
					
						return strattl7		
					}
			
		
		
		
		function resizeCheckStrategy(){
				
			const strategyGraphic = document.querySelector('.strategy-graphic')
			
			if (strategyGraphic) {	
				  var progress1 = strattl1.progress(); //record the progress so that we can match it with the new tween (jump to the same spot)
				  strattl1.kill(); //rewind and kill the original tween.
				  stratTimeline1().progress(progress1); //create a new tween based on the new size, and jump to the same progress value.
				  
				  var progress2 = strattl2.progress(); //record the progress so that we can match it with the new tween (jump to the same spot)
				  strattl2.kill(); //rewind and kill the original tween.
				  stratTimeline2().progress(progress2); //create a new tween based on the new size, and jump to the same progress value.
				  
				  var progress3 = strattl3.progress(); //record the progress so that we can match it with the new tween (jump to the same spot)
				  strattl3.kill(); //rewind and kill the original tween.
				  stratTimeline3().progress(progress3); //create a new tween based on the new size, and jump to the same progress value.
				  
				  var progress4 = strattl4.progress(); //record the progress so that we can match it with the new tween (jump to the same spot)
				  strattl4.kill(); //rewind and kill the original tween.
				  stratTimeline4().progress(progress4); //create a new tween based on the new size, and jump to the same progress value.
				  
				  var progress5 = strattl5.progress(); //record the progress so that we can match it with the new tween (jump to the same spot)
				  strattl5.kill(); //rewind and kill the original tween.
				  stratTimeline5().progress(progress5); //create a new tween based on the new size, and jump to the same progress value.
				  
				  var progress6 = strattl6.progress(); //record the progress so that we can match it with the new tween (jump to the same spot)
				  strattl6.kill(); //rewind and kill the original tween.
				  stratTimeline6().progress(progress6); //create a new tween based on the new size, and jump to the same progress value.
				  
				  var progress7 = strattl7.progress(); //record the progress so that we can match it with the new tween (jump to the same spot)
				  strattl7.kill(); //rewind and kill the original tween.
				  stratTimeline7().progress(progress7); //create a new tween based on the new size, and jump to the same progress value.
		 	}
		}
		
		const strategyCheck = document.querySelector('.strategy-graphic')
			
		if (strategyCheck) {	
		
			stratTimeline1()
			stratTimeline2()
			stratTimeline3()
			stratTimeline4()
			stratTimeline5()
			stratTimeline6()
			stratTimeline7()
		
		}
		
		//$(window).resize(resizeCheck);
		window.addEventListener("resize", resizeCheckStrategy)
	}
	
	const contactAnimation = () => {
		
		const circleAnim = {
			repeat: -1,
			duration: 20
		}
		
		var contacttl
		
		function animationContact() {
			
			const contactGraphic = document.querySelector('.contact-graphic')
			
			if (contactGraphic) {
			
			contacttl = gsap.timeline({
				repeat: -1,
				yoyo:true
			})
			
			
			contacttl.to(".contact-dot1", {
			    motionPath: {
			        path: "#contact-line1",
			        align: "#contact-line1",
			        start: 1,
			        end: 0,
			        alignOrigin: [0.5, 0.5],
			        autoRotate: true
			    },
			    ease: "none",
			    duration: circleAnim.duration
			}, 0);
			
			contacttl.to(".contact-dot2", {
			    motionPath: {
			        path: "#contact-line2",
			        align: "#contact-line2",
			        alignOrigin: [0.5, 0.5],
			        autoRotate: true
			    },
			    ease: "none",
			    duration: circleAnim.duration
			}, 0);
			
			contacttl.to(".contact-dot3", {
			    motionPath: {
			        path: "#contact-line3",
			        align: "#contact-line3",
			        alignOrigin: [0.5, 0.5],
			        autoRotate: true
			    },
			    ease: "none",
			    delay: 0.5,
			    duration: circleAnim.duration
			}, 0);
			
			contacttl.to(".contact-dot4", {
			    motionPath: {
			        path: "#contact-line4",
			        align: "#contact-line4",
			        alignOrigin: [0.5, 0.5],
			        start: 1,
			        end: 0,
			        autoRotate: true
			    },
			    ease: "none",
			    duration: circleAnim.duration + 5
			}, 0);
			
			contacttl.to(".contact-dot5", {
			    motionPath: {
			        path: "#contact-line5",
			        align: "#contact-line5",
			        alignOrigin: [0.5, 0.5],
			        autoRotate: true
			    },
			    ease: "none",
			    delay: 0.5,
			    duration: circleAnim.duration
			}, 0);
			
			contacttl.to(".contact-dot6", {
			    motionPath: {
			        path: "#contact-line6",
			        align: "#contact-line6",
			        alignOrigin: [0.5, 0.5],
			        autoRotate: true
			    },
			    ease: "none",
			    duration: circleAnim.duration
			}, 0);
			contacttl.to(".contact-dot7", {
			    motionPath: {
			        path: "#contact-line7",
			        align: "#contact-line7",
			        alignOrigin: [0.5, 0.5],
			        autoRotate: true
			    },
			    ease: "none",
			    duration: circleAnim.duration
			}, 0);
			
			return contacttl
			
			}
		}
		
		function resizeCheckContact(){
				
			const contactGraphic = document.querySelector('.contact-graphic')
			
			if (contactGraphic) {	
				  var progress = contacttl.progress(); //record the progress so that we can match it with the new tween (jump to the same spot)
				  contacttl.kill(); //rewind and kill the original tween.
				  animationContact().progress(progress); //create a new tween based on the new size, and jump to the same progress value.
		 	}
		}
		
		animationContact();
		//$(window).resize(resizeCheck);
		window.addEventListener("resize", resizeCheckContact);
			
	}
	
	const newsletterGraphic = () => {
		
		const createLines = (line, div1, div2) => {
		  var line = document.querySelector(line);
		  var div1 = document.querySelector(div1);
		  var div2 = document.querySelector(div2);
		
		  var x1 = div1.getBoundingClientRect().left + (div1.getBoundingClientRect().width/2);
		  var y1 = div1.getBoundingClientRect().top + (div1.getBoundingClientRect().height/2) + document.documentElement.scrollTop;
		  var x2 = div2.getBoundingClientRect().left + (div2.getBoundingClientRect().width/2);
		  var y2 = div2.getBoundingClientRect().top + (div2.getBoundingClientRect().height/2)+ document.documentElement.scrollTop;
		
		  line.setAttribute('x1',x1)
		  line.setAttribute('y1',y1)
		  line.setAttribute('x2',x2)
		  line.setAttribute('y2',y2)
		  
		  const resizeLines = () => {
		    var x1 = div1.getBoundingClientRect().left + (div1.getBoundingClientRect().width/2);
		    var y1 = div1.getBoundingClientRect().top + (div1.getBoundingClientRect().height/2)+ document.documentElement.scrollTop;
		    var x2 = div2.getBoundingClientRect().left + (div2.getBoundingClientRect().width/2);
		    var y2 = div2.getBoundingClientRect().top + (div2.getBoundingClientRect().height/2)+ document.documentElement.scrollTop;
		
		    line.setAttribute('x1',x1)
		    line.setAttribute('y1',y1)
		    line.setAttribute('x2',x2)
		    line.setAttribute('y2',y2);
			    requestAnimationFrame(resizeLines);
		   }
			requestAnimationFrame(resizeLines);
		}
		
		const newsletterCheck = document.querySelector('#newCircle4');
		
		if (newsletterCheck) {
			createLines('#line1', '#newCircle4', '#newCircle2')
			createLines('#line2', '#newCircle1', '#newCircle2')
			createLines('#line3', '#newCircle3', '#newCircle5')
			createLines('#line4', '#newCircle3', '#newCircle2')
		}
	}
	
	
	const scrolling = () => {

		
		const obj = document.querySelectorAll('.animate, .animate-bottom, .animate-body *')		
		
		
		ScrollReveal().reveal(document.querySelectorAll('.animate, .animate-body *'), { 
			origin: 'right'
		})
		
		ScrollReveal().reveal(document.querySelectorAll('.animate-bottom'), { 
			origin: 'bottom'
		})

		ScrollReveal().reveal(obj, { 
			delay: 0,
			duration: 1000,
			interval: 50,
			reset: false,
			distance: '30px',
		});	
	
	}
	
	
	homeAnimation()
	stratAnimation()
	teamMemberOverlays()
	portAnimation()
	newsletterGraphic()
	contactAnimation()
	scrolling()
	
/*
	
	barba.hooks.enter(() => {
	  window.scrollTo(0, 0);
	});
	
	barba.init({
	  preventRunning: true,
	  transitions: [{
	    name: 'opacity-transition',
	    leave(data) {
	      return gsap.to(data.current.container, {
	        opacity: 0
	      });
	    },
	    beforeEnter({ current, next, trigger }) {
		    const href = next.url.href
		    
	        const headerLinks = document.querySelectorAll("#primary-menu li")
	
	        headerLinks.forEach(tag => {
	         	if (tag.querySelector('a').href === href) {
		         	tag.classList.add('current_page_item')
	         	} else {
		         	tag.classList.remove('current_page_item')
	         	}
	        })
	    },
	    enter(data) {
	      return gsap.from(data.next.container, {
	        opacity: 0
	      });
	    }, 
	    after() {
		    ScrollReveal().delegate()
	    }
	  }],
	  views: [{
	    namespace: 'home',
	    beforeEnter() {
		    homeAnimation()
			scrolling()
	    }
	  },
	  {
	    namespace: 'strategy',
	    beforeEnter() {
			stratAnimation()
			scrolling()
	    }
	  },
	  {
	    namespace: 'team',

	    beforeEnter() {
	      teamMemberOverlays()
	      scrolling()
	    }
	  },
	  {
	    namespace: 'portfolio',
	    beforeEnter() {
			portAnimation()
			scrolling()
	    }
	  },
	  {
	    namespace: 'newsletter',
	    beforeEnter() {
		    newsletterGraphic()
			scrolling()
	    }
	  },{
	    namespace: 'contact',
	    beforeEnter() {
	     	contactAnimation()
	     	scrolling()
	    }
	  },
	  {
	    namespace: 'base',
	    beforeEnter() {
			scrolling()
	    }
	  }]
	});
		  
*/
	
})();