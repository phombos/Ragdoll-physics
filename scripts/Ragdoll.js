planck.testbed('tuygyugyvtydr', function(testbed) {
	testbed.width = 120;
  	var pl = planck, Vec2 = pl.Vec2;
  	var world = new pl.World(Vec2(0, -100));
  	const Rad2Deg = 180 / Math.PI;
  	var d = 0.01
  	
  	var g = world.createBody()
  	g.createFixture(pl.Edge(Vec2(-60, -20), Vec2(60, -20)), 0);
  	world.createBody().createFixture(pl.Edge(Vec2(-60, -20), Vec2(-60, 100)), 0);
  	world.createBody().createFixture(pl.Edge(Vec2(60, -20), Vec2(60, 100)), 0);
  	world.createBody(Vec2(10, 19.5)).createFixture(pl.Box(10, 1), 0);
  	world.createBody(Vec2(-45, 19.5)).createFixture(pl.Box(5, 1), 0);
  	world.createBody(Vec2(-3, -25)).createFixture(pl.Circle(10), 0);
  	
  	function Ragdoll(x, y, density){
	  	//create Body parts
	  	var head = world.createDynamicBody(Vec2(x, y));
	  	head.createFixture(pl.Circle(1.5), density);
	  	
	  	var upperBody = world.createDynamicBody(Vec2(x, y - 3.25));
	  	upperBody.createFixture(pl.Box(2, 1.5), density);
	  	
	  	var lowerBody = world.createDynamicBody(Vec2(x, y - 5.5));
	  	lowerBody.createFixture(pl.Box(2, 1), density);
	  	
	  	var upperArm1 = world.createDynamicBody(Vec2(x - 2.375, y - 4));
	  	upperArm1.createFixture(pl.Box(0.75, 2), density);
	  	
	  	var lowerArm1 = world.createDynamicBody(Vec2(x - 2.375, y - 8));
	  	lowerArm1.createFixture(pl.Box(0.75, 2), density);
	  	
	  	var upperArm2 = world.createDynamicBody(Vec2(x + 2.375, y - 4));
	  	upperArm2.createFixture(pl.Box(0.75, 2), density);
		
		var lowerArm2 = world.createDynamicBody(Vec2(x + 2.375, y - 8));
	  	lowerArm2.createFixture(pl.Box(0.75, 2), density);
		
		var upperLeg1 = world.createDynamicBody(Vec2(x - 1, y - 8.5));
	  	upperLeg1.createFixture(pl.Box(0.75, 2), density);
	  	
	  	var lowerLeg1 = world.createDynamicBody(Vec2(x - 1, y - 12.5));
	  	lowerLeg1.createFixture(pl.Box(0.75, 1.99), density);
	  	
	  	var upperLeg2 = world.createDynamicBody(Vec2(x + 1, y - 8.5));
	  	upperLeg2.createFixture(pl.Box(0.75, 2), density);
	  	
	  	var lowerLeg2 = world.createDynamicBody(Vec2(x + 1, y - 12.5));
	  	lowerLeg2.createFixture(pl.Box(0.75, 1.99), density);
		
		//connecting Body parts with revolute joint
		var neck = world.createJoint(pl.RevoluteJoint({
			upperAngle: 0.25 * Math.PI,
	    		lowerAngle: -0.25 * Math.PI,
	    		enableLimit: true
		}, head, upperBody, Vec2(x, y - 2.5)));
		
		var hips = world.createJoint(pl.RevoluteJoint({
			upperAngle: 0.1 * Math.PI,
	    		lowerAngle: -0.1 * Math.PI,
	    		enableLimit: true
		}, upperBody, lowerBody, Vec2(x, y - 4)));
		
		var armpit1 = world.createJoint(pl.RevoluteJoint({
			upperAngle: 1 * Math.PI,
	    		lowerAngle: 0 * Math.PI,
	    		enableLimit: true
		}, upperArm1, upperBody, Vec2(x - 2, y - 1.75)));
		
		var armpit2 = world.createJoint(pl.RevoluteJoint({
			upperAngle: 0 * Math.PI,
	    		lowerAngle: -1 * Math.PI,
	    		enableLimit: true
		}, upperArm2, upperBody, Vec2(x + 2, y - 1.75)));
		
		var elbow1 = world.createJoint(pl.RevoluteJoint({
			upperAngle: 0.25 * Math.PI,
	    		lowerAngle: -1 * Math.PI,
	    		enableLimit: true
		}, upperArm1, lowerArm1, Vec2(x - 2.375, y - 6)));
		
		var elbow2 = world.createJoint(pl.RevoluteJoint({
			upperAngle: 1 * Math.PI,
	    		lowerAngle: -0.25 * Math.PI,
	    		enableLimit: true
		}, upperArm2, lowerArm2, Vec2(x + 2.375, y - 6)));
		
		var crotch1 = world.createJoint(pl.RevoluteJoint({
			upperAngle: 0.25 * Math.PI,
	    		lowerAngle: -0.5 * Math.PI,
	    		enableLimit: true
		}, lowerBody, upperLeg1, Vec2(x - 1, y - 6.5)));
		
		var crotch2 = world.createJoint(pl.RevoluteJoint({
			upperAngle: 0.5 * Math.PI,
	    		lowerAngle: -0.25 * Math.PI,
	    		enableLimit: true
		}, lowerBody, upperLeg2, Vec2(x + 1, y - 6.5)));
	  	
	  	var knee1 = world.createJoint(pl.RevoluteJoint({
			upperAngle: 0.5 * Math.PI,
	    		lowerAngle: -0.5 * Math.PI,
	    		enableLimit: true
		}, upperLeg1, lowerLeg1, Vec2(x - 1, y - 10.5)));
		
		var knee2 = world.createJoint(pl.RevoluteJoint({
			upperAngle: 0.5 * Math.PI,
	    		lowerAngle: -0.5 * Math.PI,
	    		enableLimit: true
		}, upperLeg2, lowerLeg2, Vec2(x + 1, y - 10.5)));
		
		return({
			head: head,
			upperBody: upperBody,
			lowerBody: lowerBody,
			upperLeftArm: upperArm1,
			lowerLeftArm: lowerArm1,
			upperRightArm: upperArm2,
			lowerRightArm: lowerArm2,
			upperLeftLeg: upperLeg1,
			lowerLeftLeg: lowerLeg1,
			upperRightLeg: upperLeg2,
			lowerRightLeg: lowerLeg2,
			
			neck: neck,
			hips: hips,
			lefArmpit: armpit1,
			rightArmpit: armpit2,
			leftElbow: elbow1,
			rightElbow: elbow2,
			crotch1: crotch1,
			croth2: crotch2,
			leftKnee: knee1,
			rightKnee: knee2		
		})
	};
	
	var r = Ragdoll(-2, 120, 0.05)
	
	var r2 = Ragdoll(30, 80, 0.05)
	
	var vert = pl.Polygon([
		Vec2(-8, 6), 
		Vec2(-2, 8), 
		Vec2(2, 2), 
		Vec2(-4, -4), 
		Vec2(-10, -2)
	]);
  	
  	
  	var p = world.createDynamicBody({
  		restitution: 0.2,
  		position: Vec2(0, -10)
  	});
  	
  	p.createFixture(vert, {
  		restitution: 0.1,
  		density: 0.05
  	});
  	
  	var vert = pl.Polygon([
		Vec2(-2, 6), 
		Vec2(-6, 2), 
		Vec2(-4, -4), 
		Vec2(2, -6), 
		Vec2(8, -2),
		Vec2(6, 4)
	]);
  	
  	var p2 = world.createDynamicBody({
  		restitution: 0.2,
  		position: Vec2(-20, -10)
  	});
  	
  	p2.createFixture(vert, {
  		restitution: 0.1,
  		density: 0.05
  	});
	
	var wheel = world.createDynamicBody(Vec2(40, -15));
  	wheel.createFixture(pl.Circle(5), {
  		friction: 30,
  		density: 20
  	});
  	
  	world.createJoint(pl.RevoluteJoint({
  		motorSpeed: -300,
  		maxMotorTorque: 3000,
  		enableMotor: true
  	}, g, wheel, Vec2(40, -15)));
  	
  	var plank = world.createDynamicBody(Vec2(40, -1));
  	plank.createFixture(pl.Box(0.75, 10), 0.08);
	
	var piston = world.createDynamicBody(Vec2(40, 9));
  	piston.createFixture(pl.Box(20, 2), 0.08);
	
	world.createBody().createFixture(pl.Edge(Vec2(20, -20), Vec2(20, 20)), 0);
	
	world.createJoint(pl.RevoluteJoint({enableMotor: false}, wheel, plank, Vec2(40, -11)));
	world.createJoint(pl.RevoluteJoint({enableMotor: false}, piston, plank, Vec2(40, 9)));
  	
  	world.createJoint(pl.PrismaticJoint({
    		maxMotorForce: 0.0,
    		enableMotor: true
  	}, g,  piston, Vec2(0, 9), Vec2(0, -10)));
  	
  	
  	return world;
});

