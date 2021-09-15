(function() {
    angular
        .module('users')
        .directive("experiment", directiveFunction)
})();

/** Variables declaraions */

var isoelectric_stage, tick, exp_canvas;

var milk_beaker_current_x, milk_beaker_current_y, water_bottle_rotation_count, water_bottle_rotation_timer;

var milk_beaker_rotation_count, milk_beaker_rotation_timer, milk_return_count, milk_return_timer;

var water_bottle_current_x, water_bottle_current_y, masking_timer, water_falling_count, water_falling_timer;

var water_return_count, water_return_timer, hcl_drop_timer, hcl_drop_flag, milk_drop_flag, water_drop_flag;

var solution_mask_initial_y, milk_quantity, water_quantity, solution_mask_current_y, solution_range;

/** Arrays declarations */
var help_array = [];

/** Createjs shapes declarations */
var hit_solution_rect = new createjs.Shape();
var mask_milk_rect = new createjs.Shape();
var milk_pouring_rect = new createjs.Shape();
var hcl_drop_rect = new createjs.Shape();
var precipitation_mask_rect = new createjs.Shape();
var solution_mask_rect = new createjs.Shape();

function directiveFunction() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            /** Variable that decides if something should be drawn on mouse move */
            var experiment = true;
            if (element[0].width > element[0].height) {
                element[0].width = element[0].height;
                element[0].height = element[0].height;
            } else {
                element[0].width = element[0].width;
                element[0].height = element[0].width;
            }
            if (element[0].offsetWidth > element[0].offsetHeight) {
                element[0].offsetWidth = element[0].offsetHeight;
            } else {
                element[0].offsetWidth = element[0].offsetWidth;
                element[0].offsetHeight = element[0].offsetWidth;
            }
            exp_canvas = document.getElementById("demoCanvas");
            exp_canvas.width = element[0].width;
            exp_canvas.height = element[0].height;

            /** Initialisation of stage */
            isoelectric_stage = new createjs.Stage("demoCanvas");
            queue = new createjs.LoadQueue(true);     
            /** Preloading the images */
            queue.loadManifest([{
                id: "background",
                src: "././images/background.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "equipment_under",
                src: "././images/equipment_under.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "burette_solution",
                src: "././images/burette_solution.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "burette_close",
                src: "././images/burette_close.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "burette_open",
                src: "././images/burette_open.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "equipment_front",
                src: "././images/equipment_front.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker",
                src: "././images/milk_beaker.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle",
                src: "././images/water_bottle.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "beaker_milk_still",
                src: "././images/beaker_milk_still.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "beaker",
                src: "././images/beaker.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation1",
                src: "././images/water_bottle_rotation1.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation2",
                src: "././images/water_bottle_rotation2.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation3",
                src: "././images/water_bottle_rotation3.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation4",
                src: "././images/water_bottle_rotation4.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation5",
                src: "././images/water_bottle_rotation5.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation6",
                src: "././images/water_bottle_rotation6.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation7",
                src: "././images/water_bottle_rotation7.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation8",
                src: "././images/water_bottle_rotation8.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation9",
                src: "././images/water_bottle_rotation9.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation10",
                src: "././images/water_bottle_rotation10.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation11",
                src: "././images/water_bottle_rotation11.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation12",
                src: "././images/water_bottle_rotation12.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_bottle_rotation13",
                src: "././images/water_bottle_rotation13.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation1",
                src: "././images/milk_beaker_rotation1.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation2",
                src: "././images/milk_beaker_rotation2.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation3",
                src: "././images/milk_beaker_rotation3.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation4",
                src: "././images/milk_beaker_rotation4.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation5",
                src: "././images/milk_beaker_rotation5.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation6",
                src: "././images/milk_beaker_rotation6.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation7",
                src: "././images/milk_beaker_rotation7.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation8",
                src: "././images/milk_beaker_rotation8.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation9",
                src: "././images/milk_beaker_rotation9.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation10",
                src: "././images/milk_beaker_rotation10.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation11",
                src: "././images/milk_beaker_rotation11.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation12",
                src: "././images/milk_beaker_rotation12.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_beaker_rotation13",
                src: "././images/milk_beaker_rotation13.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return1",
                src: "././images/milk_return1.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return2",
                src: "././images/milk_return2.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return3",
                src: "././images/milk_return3.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return4",
                src: "././images/milk_return4.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return5",
                src: "././images/milk_return5.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return6",
                src: "././images/milk_return6.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return7",
                src: "././images/milk_return7.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return8",
                src: "././images/milk_return8.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return9",
                src: "././images/milk_return9.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return10",
                src: "././images/milk_return10.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return11",
                src: "././images/milk_return11.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return12",
                src: "././images/milk_return12.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return13",
                src: "././images/milk_return13.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return14",
                src: "././images/milk_return14.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return15",
                src: "././images/milk_return15.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return16",
                src: "././images/milk_return16.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return17",
                src: "././images/milk_return17.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return18",
                src: "././images/milk_return18.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return19",
                src: "././images/milk_return19.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "milk_return20",
                src: "././images/milk_return20.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_falling1",
                src: "././images/water_falling1.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_falling2",
                src: "././images/water_falling2.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_falling3",
                src: "././images/water_falling3.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_falling4",
                src: "././images/water_falling4.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_falling5",
                src: "././images/water_falling5.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return1",
                src: "././images/water_return1.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return2",
                src: "././images/water_return2.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return3",
                src: "././images/water_return3.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return4",
                src: "././images/water_return4.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return5",
                src: "././images/water_return5.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return6",
                src: "././images/water_return6.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return7",
                src: "././images/water_return7.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return8",
                src: "././images/water_return8.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return9",
                src: "././images/water_return9.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return10",
                src: "././images/water_return10.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return11",
                src: "././images/water_return11.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return12",
                src: "././images/water_return12.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return13",
                src: "././images/water_return13.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return14",
                src: "././images/water_return14.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return15",
                src: "././images/water_return15.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return16",
                src: "././images/water_return16.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return17",
                src: "././images/water_return17.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return18",
                src: "././images/water_return18.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return19",
                src: "././images/water_return19.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "water_return20",
                src: "././images/water_return20.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "precipitation",
                src: "././images/precipitation.png",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "drop",
                src: "././images/drop.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "precipitated_milk",
                src: "././images/precipitated_milk.svg",
                type: createjs.LoadQueue.IMAGE
            }, {
                id: "popup",
                src: "././images/popup.svg",
                type: createjs.LoadQueue.IMAGE
            }]);
            queue.installPlugin(createjs.Sound);
            queue.on("complete", handleComplete, this);
            loadingProgress(queue,isoelectric_stage,exp_canvas.width);
                        
            isoelectric_stage.enableDOMEvents(true);
            isoelectric_stage.enableMouseOver();
            createjs.Touch.enable(isoelectric_stage);
            tick = setInterval(updateTimer, 100); /** Stage update function in a timer */

            function handleComplete() {
                /** Initializing the variables */
                initialisationOfVariables(); 
                /** Loading images, text and containers */
                loadImages(queue.getResult("background"), "background", -40, -40, "", 0, isoelectric_stage, 1.1);
                loadImages(queue.getResult("equipment_under"), "equipment_under", -40, -40, "", 0, isoelectric_stage, 1.1);
                loadImages(queue.getResult("burette_solution"), "burette_solution", -40, -40, "", 0, isoelectric_stage, 1.1);
                loadImages(queue.getResult("equipment_front"), "equipment_front", -40, -40, "", 0, isoelectric_stage, 1.1); 
                loadImages(queue.getResult("burette_close"), "burette_close", 295, 350, "", 0, isoelectric_stage, 1.1);
                loadImages(queue.getResult("burette_open"), "burette_open", 295, 350, "", 0, isoelectric_stage, 1.1);               
                loadImages(queue.getResult("water_bottle"), "water_bottle", 600, 540, "", 0, isoelectric_stage, 1);
                loadImages(queue.getResult("drop"), "drop", 308, 410, "", 0, isoelectric_stage, 1);
                /** Water falling images */              
                for ( var i=1; i<=5; i++ ) {
                    loadImages(queue.getResult("water_falling"+i), "water_falling"+i, 0, 0, "", 0, isoelectric_stage, 1);
                    getChild("water_falling"+i).visible = false;
                }
                loadImages(queue.getResult("beaker_milk_still"), "beaker_milk_still", 258, 392, "", 0, isoelectric_stage, 1.1);
                loadImages(queue.getResult("precipitation"), "precipitation", 220, 300, "", 0, isoelectric_stage, 0.9);
                loadImages(queue.getResult("precipitated_milk"), "precipitated_milk", 262, 492, "", 0, isoelectric_stage, 1.1);
                loadImages(queue.getResult("beaker"), "beaker", 247, 376, "", 0, isoelectric_stage, 1.1);
                loadImages(queue.getResult("milk_beaker"), "milk_beaker", 525, 593, "move", 0, isoelectric_stage, 1); 
                loadImages(queue.getResult("popup"), "popup", 300, 290, "", 0, isoelectric_stage, 0.9);          

                setText("reading_text", 80, 655, "0.0", "#E3B80A", 2, isoelectric_stage); /** Label for height H */
                setText("popup_text", 330, 320, "Drop HCl", "black", 1.3, isoelectric_stage); /** Label for popup */
            
                /** Function call for images used in the apparatus visibility */
                initialisationOfImages();
                /** Translation of strings using gettext */
                translationLabels();
                /** Milk beaker and water bottle hit on this rect */
                hit_solution_rect.graphics.beginFill("red").drawRect(330, 300, 200, 200);
                hit_solution_rect.alpha = 0.01;
                isoelectric_stage.addChild(hit_solution_rect);

                /** Solution mask rect is adding for reducing the HCL solution */
                isoelectric_stage.addChild(solution_mask_rect);
                solution_mask_rect.x = 290;
                solution_mask_rect.y = 120;
                solution_mask_rect.graphics.beginFill("green").drawRect(0, 0, 50, 350).command;
                solution_mask_rect.alpha = 0.01;
                solution_mask_rect.mouseEnabled = false;

                /** Rect for HCL drop event */
                hcl_drop_rect.graphics.beginFill("red").drawRect(290, 340, 50, 50);
                hcl_drop_rect.alpha = 0.01;
                isoelectric_stage.addChild(hcl_drop_rect);              

                dragDropMilk(scope); /** Function for drag milk beaker and drop milk */            

                /** Click event of hcl drop rect for dropping HCL */
                hcl_drop_rect.on("click", function(evt) {
                    if ( hcl_drop_flag == false ) { /** If HCL is not dropping */                 
                        scope.reading_result = false; /** Display the error message and icon */
                        document.getElementById("error_icon2").style.display = "none";
                        /** Drop HCL function in a timer */
                        hcl_drop_timer = setInterval(dropHcl, 200);
                        hcl_drop_flag = true; /** Setting the hcl_drop_flag as true */  
                        getChild("burette_open").visible = true;  
                        getChild("burette_close").visible = false; 
                        scope.$apply(); 
                    } else { /** If HCL is already dropped */
                        clearInterval(hcl_drop_timer); /** Clear the hcl_drop_timer */ 
                        getChild("burette_open").visible = false; 
                        getChild("burette_close").visible = true;                
                        if ( getChild("reading_text").text != 4.6 ) { /** If the pH reading is less than 4.6 */
                            scope.reading_result = true; /** Display the error message and icon */
                            document.getElementById("error_icon2").style.display = "block";
                            scope.$apply();
                            hcl_drop_flag = false; /** Setting the hcl_drop_flag as false */ 
                        }
                    }                    
                });
                hcl_drop_rect.on("mouseover", function(evt) {
                    getChild("popup").visible = true;
                    getChild("popup_text").visible = true;
                });
                hcl_drop_rect.on("mouseout", function(evt) {
                    getChild("popup").visible = false;
                    getChild("popup_text").visible = false;
                });
                /** Add mask_milk_rect for masking the milk */
                isoelectric_stage.addChild(mask_milk_rect);
                mask_milk_rect.x = 250;
                mask_milk_rect.y = 520;
                mask_milk_rect.graphics.beginFill("red").drawRect(0, 0, 140, 140).command;
                mask_milk_rect.alpha = 0.01;
                scope.$apply();
            }

            /** Add all the strings used for the language translation here. '_' is the short cut for 
            calling the gettext function defined in the gettext-definition.js */
            function translationLabels() {
                /** This help array shows the hints for this experiment */
                help_array = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("Next"), _("Close")];
                scope.heading = _("Isoelectric Precipitation of Proteins - Casein from Milk");
                scope.variables = _("Instructions");
                scope.result = _("Messages");
                scope.copyright = _("copyright");
                scope.instruction1 = _("instruction1");
                scope.instruction2 = _("instruction2");
                scope.instruction3 = _("instruction3");
                scope.instruction4 = _("instruction4");
                scope.instruction5 = _("instruction5");
                scope.solution_result_text = _("solution_result_text");
                scope.reading_result_text = _("reading_result_text");
                scope.reset_txt = _("Reset");
                scope.$apply();
            }
        }
    }
}

/** All the texts loading and added to the natural_convection_stage */
function setText(name, textX, textY, value, color, fontSize, container) {
    var _text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
    _text.x = textX;
    _text.y = textY;
    _text.textBaseline = "alphabetic";
    _text.name = name;
    _text.text = value;
    _text.color = color;
    container.addChild(_text); /** Adding text to the container */
}

/** All the images loading and added to the natural_convection_stage */
function loadImages(image, name, xPos, yPos, cursor, rot, container, scale) {
    var _bitmap = new createjs.Bitmap(image).set({});
    if ( name == "milk_beaker" || name == "water_bottle" ) {
        _bitmap.regX = _bitmap.image.width / 2;
        _bitmap.regY = _bitmap.image.height / 2;
    }
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.scaleX = _bitmap.scaleY = scale;
    _bitmap.name = name;
    _bitmap.alpha = 1;
    _bitmap.rotation = rot;
    _bitmap.cursor = cursor;
    if ( name == "beaker_milk_still" ) {
        _bitmap.mask = mask_milk_rect;
    }
    if ( name == "precipitation" ) {
        _bitmap.mask = precipitation_mask_rect;
    }
    if ( name == "burette_solution" ) {
        _bitmap.mask = solution_mask_rect;
    }
    container.addChild(_bitmap); /** Adding bitmap to the container */
}

/** Function to return child element of stage */
function getChild(child_name) {
    return isoelectric_stage.getChildByName(child_name); /** Returns the child element of stage */
}
 
/** All variables initialising in this function */
function initialisationOfVariables() {
    water_bottle_rotation_count = 0;
    milk_beaker_rotation_count = 0;
    milk_return_count = 0;
    water_falling_count = 0;
    water_return_count = 0;
    hcl_drop_flag = false;
    solution_mask_initial_y = 518;
    hcl_drop_rect.mouseEnabled = false;
    solution_range = 5;
}

/** Set the initial status of the bitmap and 
text depends on its visibility and initial values */
function initialisationOfImages() {
    getChild("precipitated_milk").alpha = 0.01;
    getChild("precipitation").alpha = 0.01;
    getChild("burette_open").visible = false;
    getChild("drop").visible = false;
    getChild("popup").visible = false;
    getChild("popup_text").visible = false;
    /** Loading water bottle animation and milk bottle animation images 
    and set these visibility as false */
    for ( var i=1; i<=13; i++ ) {
        loadImages(queue.getResult("water_bottle_rotation"+i), "water_bottle_rotation"+i, 0, 0, "pointer", 0, isoelectric_stage, 1);
        loadImages(queue.getResult("milk_beaker_rotation"+i), "milk_beaker_rotation"+i, 0, 0, "pointer", 0, isoelectric_stage, 1);
        getChild("water_bottle_rotation"+i).visible = false;
        getChild("milk_beaker_rotation"+i).visible = false;
    }
    /** Loading milk bottle and water bottle return animation images
    and set these visibility as false */
    for ( var i=1; i<=20; i++ ) {
        loadImages(queue.getResult("milk_return"+i), "milk_return"+i, 0, 0, "", 0, isoelectric_stage, 1);
        getChild("milk_return"+i).visible = false;
        loadImages(queue.getResult("water_return"+i), "water_return"+i, 0, 0, "", 0, isoelectric_stage, 1);
        getChild("water_return"+i).visible = false;
    } 
}

/** Stage updation function */
function updateTimer() {
    isoelectric_stage.update();
}