/** Drag and drop milk from milk beaker */
function dragDropMilk(scope) {
    milk_drop_flag = true;
    getChild("milk_beaker").on("mousedown", function(evt) { /** Milk beaker mouse down function */
        this.parent.addChild(this);
        this.offset = {
            x: this.x - evt.stageX,
            y: this.y - evt.stageY
        };
    });
    getChild("milk_beaker").on("pressmove", function(evt) { /** Milk beaker press move function */
        this.y = evt.stageY + this.offset.y;
        this.x = evt.stageX + this.offset.x;
        milk_beaker_current_x = evt.stageX; /** Assigning the current x and y value to a variable */
        milk_beaker_current_y = evt.stageY;
    });
    getChild("milk_beaker").on("pressup", function(event) { /** Milk beaker press up function */
        /** Hit function of milk beaker with hit_solution_rect */
        var hit_obj = hit_solution_rect.globalToLocal(milk_beaker_current_x, milk_beaker_current_y);
        if ( hit_solution_rect.hitTest(hit_obj.x, hit_obj.y) ) {
            hit_solution_rect.cursor = "pointer";
            /** Milk beaker rotation and pouring of milk animation function in a timer */
            milk_beaker_rotation_timer = setInterval(function() { 
                milk_beaker_rotation_count++; /** Milk rotation count increment */
                milkPour(scope, milk_beaker_rotation_count); /** Milk pouring animation function */
                /** We can stop the pouring of milk, when milk beaker rotation count is greater than 12 */
                if ( milk_beaker_rotation_count > 12 ) { 
                    milkBeakerReturn(scope);
                    clearInterval(milk_beaker_rotation_timer);                    
                }
            },200);
        } else { /** If the beaker is not hit with hit_solution_rect */
            getChild("milk_beaker").x = 525;
            getChild("milk_beaker").y = 593;
        }
    });
}
/** Pouring of milk function */
function milkPour(scope, milk_beaker_rotation_count) {
    getChild("milk_beaker").visible = false;
    for ( var i=1; i<=13; i++ ) { /** Initially all milk beaker rotation images set visible false */
        getChild("milk_beaker_rotation"+i).visible = false;
    }
    /** Milk must pour after rotating the milk beaker, that rotation count is milk_beaker_rotation_count */
    if ( milk_beaker_rotation_count == 6 ) { 
        /** Adding of milk_pouring_rect for masking the milk in big beaker */
        milk_pouring_rect.graphics.beginFill("white").drawRect(362, 356, 3, 158);
        isoelectric_stage.addChild(milk_pouring_rect);  
        masking_timer = setInterval(function() { maskingMilk(scope); }, 10); /** Masking of milk in big beaker */          
    }    
    getChild("milk_beaker_rotation"+milk_beaker_rotation_count).visible = true;
}
/** Milk beaker return function */
function milkBeakerReturn(scope) {
    hit_solution_rect.on("click", function(evt) { /** Milk beaker return on the click event of hit_solution_rect */
        /** Calculation of milk quantity */
        solution_mask_current_y = mask_milk_rect.y;
        milk_quantity = solution_mask_initial_y - solution_mask_current_y;
        solution_mask_initial_y = mask_milk_rect.y;
        hit_solution_rect.mouseEnabled = false;
        getChild("reading_text").text = 6.6;
        milk_return_timer = setInterval(function() { /** Milk return animation image setting function in a timer */
            getChild("milk_beaker_rotation"+milk_beaker_rotation_count).visible = false;
            clearInterval(masking_timer);
            milk_pouring_rect.alpha = 0;
            milk_return_count++;
            milkReturn(milk_return_count); /** Milk return animation image setting function */
            if ( milk_return_count == 20 ) { /** If milk_return_count turns 20, the timer clear */
                clearInterval(milk_return_timer);
                getChild("water_bottle").mouseEnabled = true;
                getChild("water_bottle").cursor = "move";
                dragDropWater(scope); /** After completing milk pouring, we can drag and drop water */
            }
        },100);
    });
}
/** Milk return animation image setting function */
function milkReturn(milk_return_count) {
    for ( var i=1; i<=20; i++ ) {
        getChild("milk_return"+i).visible = false;
    }
    getChild("milk_return"+milk_return_count).visible = true; 
    isoelectric_stage.removeChild(hit_solution_rect); /** Removing the hit solution rect */
}
/** Masking of milk function */
function maskingMilk(scope) {
    /** If the milk beaker is filled up with solution */
    if ( mask_milk_rect.y <= 400 ) { 
        clearInterval(milk_beaker_rotation_timer); /** Clear all timers */
        clearInterval(milk_return_timer);
        clearInterval(masking_timer);
        clearInterval(water_falling_timer);
        hit_solution_rect.mouseEnabled = false;
        if ( milk_drop_flag ) { /** If the milk beaker is filled up with only milk */
            for ( var i=1; i<=13; i++ ) {
                getChild("milk_beaker_rotation"+i).visible = false;
            }
            milk_pouring_rect.visible = false;
            getChild("milk_return20").visible = true;
        }
        if ( water_drop_flag ) { /** If the milk beaker is filled up with water */
            for ( var i=1; i<=13; i++ ) {
                getChild("water_bottle_rotation"+i).visible = false;
            }
            for ( var i=1; i<=5; i++ ) {
                getChild("water_falling"+i).visible = false;
            }
            getChild("water_return20").visible = true;
        }
        scope.solution_result = true; /** Display the error message and error icon */
        document.getElementById("error_icon1").style.display = "block";
        scope.$apply(); 
    } else { /** Else if the milk beaker is not filled up */
        mask_milk_rect.y = mask_milk_rect.y-0.1; 
    }      
}
/** Drag and drop water from water bottle */
function dragDropWater(scope) {
    water_drop_flag = true; 
    hit_solution_rect = new createjs.Shape();
    hit_solution_rect.graphics.beginFill("red").drawRect(330, 300, 200, 200);
    hit_solution_rect.alpha = 0.01;
    isoelectric_stage.addChild(hit_solution_rect); 
    getChild("water_bottle").on("mousedown", function(evt) { /** Water bottle mouse down function */
        this.parent.addChild(this);
        this.offset = {
            x: this.x - evt.stageX,
            y: this.y - evt.stageY
        };
    });   
    getChild("water_bottle").on("pressmove", function(evt) { /** Water bottle press move function */
        this.y = evt.stageY + this.offset.y;
        this.x = evt.stageX + this.offset.x;
        water_bottle_current_x = evt.stageX;
        water_bottle_current_y = evt.stageY;
    });
    getChild("water_bottle").on("pressup", function(event) { /** Water bottle press up function */
        /** Hit function of water bottle with hit_solution_rect */
        var hit_obj = hit_solution_rect.globalToLocal(water_bottle_current_x, water_bottle_current_y); 
        if ( hit_solution_rect.hitTest(hit_obj.x, hit_obj.y) ) { 
            hit_solution_rect.cursor = "pointer";         
            water_bottle_rotation_timer = setInterval(function() {
                water_bottle_rotation_count++; /** water bottle rotation count increment */
                waterBottlePour(scope,water_bottle_rotation_count); /** Water pouring animation function */
                /** We can stop the pouring of water, when water bottle rotation count is greater than 10 */
                if ( water_bottle_rotation_count > 12 ) {
                    clearInterval(water_bottle_rotation_timer);
                    waterBottleReturn(scope); /** Water bottle return function */
                }                    
            },200);
        } else { /** If the beaker is not hit with hit_solution_rect */
            getChild("water_bottle").x = 600;
            getChild("water_bottle").y = 540;
        }
    });
}
/** Pouring of water function */
function waterBottlePour(scope,water_bottle_rotation_count) {
    getChild("water_bottle").visible = false;
    for ( var i=1; i<=13; i++ ) { /** Initially all water bottle rotation images set visible false */
        getChild("water_bottle_rotation"+i).visible = false;
    }
    getChild("water_bottle_rotation"+water_bottle_rotation_count).visible = true;
    /** Water must pour after rotating the water bottle, that rotation count is water_bottle_rotation_count */
    if ( water_bottle_rotation_count == 6 ) {       
        masking_timer = setInterval(function() { maskingMilk(scope); }, 10); /** Masking of solution function in a timer */
        water_falling_timer = setInterval(function() { /** Water falling animation function in a timer */
            water_falling_count++; /** Increment of water_falling_count */
            waterFalling(water_falling_count); /** Water falling animation function */
            if ( water_falling_count == 5 ) { /** Resetting of water falling count */
                water_falling_count = 1; /** Set water_falling_count as 1 */
            }                    
        },100);
    }
}
/** Water falling animation function */
function waterFalling(water_falling_count) {
    for ( var i=1; i<=5; i++ ) { /** Initially all water falling images set visible false */
        getChild("water_falling"+i).visible = false;
    }
    getChild("water_falling"+water_falling_count).visible = true;
    /** Dilution of milk while adding water */
    getChild("beaker_milk_still").alpha = getChild("beaker_milk_still").alpha - 0.005;
}
/** Water bottle return function */
function waterBottleReturn(scope) {
    hit_solution_rect.on("click", function(evt) {/** Water bottle return on the click event of hit_solution_rect */
        /** Calculation of water quantity */
        solution_mask_current_y = mask_milk_rect.y;
        water_quantity = solution_mask_initial_y - solution_mask_current_y;
        hit_solution_rect.mouseEnabled = false;  
        clearInterval(water_falling_timer);
        for ( var i=1; i<=5; i++ ) { /** Set visibility false of water falling animation images */
            getChild("water_falling"+i).visible = false;
        }    
        water_return_timer = setInterval(function() { /** Water bottle return animation image setting function in a timer */
            getChild("water_bottle_rotation"+water_bottle_rotation_count).visible = false;
            clearInterval(masking_timer);
            water_return_count++;
            waterReturn(water_return_count); /** Water return animation image setting function */
            if ( water_return_count == 20 ) { /** Clear the timer if water bottle returns to the old position */
                clearInterval(water_return_timer);
                calculation(scope); /** Measurement of water and milk quantity */
                /** Masking of precipitation_mask_rect for milk water precipitation */
                precipitation_mask_rect.graphics.beginFill("green").drawRoundRect(262, mask_milk_rect.y, 115, 515-mask_milk_rect.y, 10);
                isoelectric_stage.addChild(precipitation_mask_rect);
                precipitation_mask_rect.alpha = 0.01;
            }
        },100);
    });
}
/** Water return animation image setting function */
function waterReturn(water_return_count) {
    for ( var i=1; i<=20; i++ ) {
        getChild("water_return"+i).visible = false;
    }
    getChild("water_return"+water_return_count).visible = true; 
}
/** Dropping of HCL function */
function dropHcl() {    
    getChild("drop").visible = true;
    if ( getChild("drop").y == 410 ) {
        var hcl_falling_tween = createjs.Tween.get(getChild("drop")).to({
            y: 500
        }, 500); /** Hcl drop falling tween */
        getChild("reading_text").text = (getChild("reading_text").text-0.1).toFixed(1);
    } else if ( getChild("drop").y == 500 ) {
        getChild("drop").y = 410;
    }
    if ( getChild("reading_text").text <= 5.0 ) { /** If the pH-meter reading is less than or equal to 5 */
        var precipitation_tween = createjs.Tween.get(getChild("precipitation")).to({
            y: getChild("precipitation").y+130
        }, 4000); /** Hcl drop falling tween */
        getChild("precipitation").alpha = 1;
        if ( getChild("beaker_milk_still").alpha > 0.5 ) { /** Alpha setting of beaker solution and precipitated milk images */
            getChild("beaker_milk_still").alpha = getChild("beaker_milk_still").alpha-0.03;
            getChild("precipitated_milk").alpha = getChild("precipitated_milk").alpha+0.1;
        }        
    }
    solution_mask_rect.y = solution_mask_rect.y+0.4;
    isoelectric_stage.addChild(hcl_drop_rect);
    if ( getChild("reading_text").text == 0 ) { /** Stop dropping of HCL when the reading turns 0 */
        clearInterval(hcl_drop_timer);
    } 
}

/** Reset the experiment in the reset button event */
function resetExperiment() {
    window.location.reload();
}

/** Calculation starts here */
function calculation(scope) {    
    /** Measurement of water and milk quantity. According to the water and milk propotion 
    incrementing and decrementing a particular range of value to the excisting water & milk quantity. */
    if ( water_quantity <= milk_quantity+solution_range && water_quantity >= milk_quantity-solution_range ){
        hcl_drop_rect.mouseEnabled = true; 
        hcl_drop_rect.cursor = "pointer";
    } else {
        scope.solution_result = true; /** Display of error message */
        document.getElementById("error_icon1").style.display = "block";
        scope.$apply();  
    }
}
/** Calculation ends here */