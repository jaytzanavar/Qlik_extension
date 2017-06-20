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
		ref:"myproperties.min"
		};


		var MaxProperty={
			type:"integer",
			label:"Maximum",
			ref:"myproperties.max"
		};

		// HERE I JOIN THE Properties into this one
		var CustomSection =
		{
			component:"expandable-items",//watch the spelling!!!
			label:" Custom made Section",
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
						ref:"myDynamicOutput",//data to be passed arround the tables
						type:"string", 
						label:"Steve walks warily down" ,//name
						expression:"optional"
					};

			var lyr2={
						ref:"myDynamicOutput",//data to be passed arround the tables
						type:"string", 
						label:"With his brim pulled way down low" ,//name
						expression:"optional"
					  };

			var lyr3={
					ref:"myDynamicOutput",//data to be passed arround the tables
					type:"string", 
					label:"Ain't no sound but",//name
					expression:"optional"
				};

				var complexItems=
				{  // not the same as Custom section
						label:"anotheronebites",
						component:"expandable-items",
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

			
			// initialProperties : {
			// 			version: 1.0,
			// 			qHyperCubeDef : {
			// 				qDimensions : [],
			// 				qMeasures : [],
			// 				qInitialDataFetch : [{
			// 					qWidth : 10,
			// 					qHeight : 50
			// 				}]
			// 			}
			// 		},

			definition:{
				type:"items",
				component:"accordion",
				items:{
					// dimensions:{
					// 	uses: "dimensions",
					// 	min: 1,
					// 	max: 1
					// },
					// measures:{
					// 	uses: "measures",
					// 	min: 1,
					// 	max: 1
					// },
					sorting:{
						uses: "sorting"
					},
					addons: {
						uses: "addons"
					},
					settings:{
						uses: "settings",
						items:{
							MyDropdownProp:
								{
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
					console.info('paint >> layout >> ', layout);
					$element.empty();
					var $myVar = $(document.createElement('div'));
					$myVar.html('the simple extension starts');
					var $addEle=$(document.createElement('a'));
					$addEle.html(layout.myDynamicOutput);  // OUTPU FROM PERSONAL Apperance panel Item properties
					$addEle.html(layout.myproperties.max);
					$element.append( $myVar );
					$element.append( $addEle );

					var $msg= $( document.createElement('div'));

					$msg.html('<b>The file embeded values:</b><br/><h1>The title::'+layout.title+'</h1><br/>'+'<h2>The Subtitle::'+layout.subtitle+'</h2><br/>');
					$element.append($msg);


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
