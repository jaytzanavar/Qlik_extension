define(
	['jquery'],
function($){
	'use strict';
	
	//$("<style>").html(cssContent).appendTo("head"); FOR css purposes ;)

	//Components edit ********* MAKE MY OWN Components ************* //
		
			

	var stringProperty={
		ref:"myDynamicOutput",//data to be passed arround the tables
		type:"string", 
		label:"Jay_Setting" ,//name
		expression:"optional"
		};


	var MinProperty={
		type:"integer",
		label:"Minimum",
		ref:"myproperties.min",
		expression:"optional"
		};


		var MaxProperty={
			type:"integer",
			label:"Maximum",
			ref:"myproperties.max",
			expression:"optional"
		};

		// HERE I JOIN THE Properties into this one
		var CustomSection =
		{
			component:"expandable-items",//watch the spelling!!!
			label:" Custom made Section",
			ref:"CustomSelection",
			items:{
				header1:{
					type:"items",
					label:"Custom Section",
					items:{
						header1_item1:stringProperty,
						header1_item2:MinProperty,
						header1_item3:MaxProperty
					}

					}

				}
			};
		


			var lyr1={
						ref:"lyr1",//data to be passed arround the tables
						type:"string", 
						label:"Steve walks warily down" ,//name
						expression:"optional"
					};

			var lyr2={
						ref:"lyr2",//data to be passed arround the tables
						type:"string", 
						label:"With his brim pulled way down low" ,//name
						expression:"optional"
					  };

			var lyr3={
					ref:"lyr3",//data to be passed arround the tables
					type:"string", 
					label:"Ain't no sound but",//name
					expression:"optional"
				};

				var complexItems=
				{  // not the same as Custom section
						label:"anotheronebites",
						component:"expandable-items",
						ref:"queenSong",
						items:{
							headerA:{
							type:"items",
							label:"lets go",
							items:{//watch the spelling!!!
							
								stringProperty:lyr1,
								stringProperty1:lyr2,
								stringProperty2:lyr3
							}

						}
					}

			};


	return{

			initialProperties: {
				version: 1.0,
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInterColumnSortOrder : [0,1],
					 qInitialDataFetch : [{  
	                    qWidth : 10,  
	                    qHeight : 1000  
	                }]  
				},
				qListObjectDef : {
					qShowAlternatives : true,
					qFrequencyMode : "V",
					qInitialDataFetch : [{
						qWidth : 2,
						qHeight : 50
					}]
				},
				fixed : true,
				width : 25,
				percent : true,
				selectionMode : "CONFIRM"
				
			},
			
			

			definition:{
				type:"items",
				component:"accordion",
				items:{
					dimensions:{
						uses: "dimensions",
						
					},
					measures:{
						uses: "measures",
					
					},
					sorting:{
						uses: "sorting"
					},
					addons: {
						uses: "addons"
					},
					settings:{
						uses: "settings",
						items:{
							initFetchRows : {
								ref : "qHyperCubeDef.qInitialDataFetch.0.qHeight",
								translation : "Thresshold",
								type : "number",
								defaultValue : 50
							},
					MyDropdownProp:{
								type:"string",
								component:"dropdown",
								label:"custom dropdown",
								ref:"customprops.dropdown",
								options:[{
											value:"v",
											label:"Slash"
										},
										{
											value:"h",
											label:"George Ezra"
										},
										{
											value:"C",
											label:"Chris Cornel"
										},
									],
								defaultValue:"v"
								},
					MyColorPicker:{
									label:"Palette",
									component:"color-picker",
									ref:"myColor",
									type:"integer",
									defaultValue:3
								}
						}
					},
					customSection:CustomSection,
					anotherbitesthedust:complexItems
				}
			},

			//********************DROP DOWN WITH THE USE OF Jquery ===OPTIONS ***************
			// options: function() {
			// 			return $.get("datasource.php").then(function(items){
			// 				return items.map(function(item){
			// 					return {
			// 						value:item.toLowerCase(),
			// 						label:item
			// 					};
			// 				});



			//Paint resp.Rendering logic renders the file of the extension
			paint: function ($element, layout)
			{
					
					console.info('paint >> layout >>  Data // HyperCube', layout.qHyperCube);
					$element.empty();

					var lastrow = 0, me = this;
				     //loop through the rows we have and render
				     // this.backendApi.eachDataRow( function ( rownum, row ) {
				     //            lastrow = rownum;
				     //            //do something with the row..
				     // });
								
					var $myVar = $(document.createElement('div'));
					var $addEle=$(document.createElement('div'));
					var $msg= $( document.createElement('div'));
					var $newMsg= $(document.createElement('div'));


					$msg.html('<b>The file embeded values:</b><br/><h1>The title::'+layout.title+'</h1><br/>'+'<h2>The Subtitle::'+layout.subtitle+'</h2><br/>');
					
					$newMsg.html('add me lyrics  '+layout.lyr1+" "+layout.lyr2+"		"+layout.lyr2);
					$myVar.html('the simple extension starts');
					$addEle.html(layout.myDynamicOutput);  // OUTPU FROM PERSONAL Apperance panel Item properties
					$addEle.html(layout.myproperties.max);
					$addEle.html(layout.myproperties.min);

					$element.append($msg);
					$element.append($newMsg);
					$element.append( $myVar );
					$element.append( $addEle );

					


						 var err = {
								        message: 'Something went wrong',
								        errCode: '204'
								    };

				    /* how to show errors*/

			    //console.info( 'We are re-painting the extension' );
			    //console.error( 'Oops, we haven an error', err );
			    //console.log( 'We are here' );
			    //console.log( 'layout', layout );
			 }

	
			

			
		};
	});
