define(["jquery","qlik",  
  "text!./d3j_sStyle.css",  
  "./d3.min",  
  "./d3j_sDonut",  
         // "./pointergestures",  
         // "./pointerevents"  
         ],  
         function($,qlik,cssContent) {  
             'use strict';  
             $("<style>").html(cssContent).appendTo("head");  

             var lastrowG=0;
             var dirty=0;
             var morePressed=0;


             function rowsMaker( $element,rows, dimensionInfo,lastrow,InitialRows)
             {   
                var appendStuff="";
                var cnt=0,
                newRow=0;

                var appendBlock=0;
                var keepHold=[];



                rows.forEach(function(row,keyUp)
                {
                 if( row[0].qElemNumber >= 0)
                 {

                    appendStuff+='<tr ';
                    row.forEach(function (cell, key)
                    {

                        keepHold.push(cell.qText);
                        appendStuff+='class="  data state'+row[0].qState+'" data-value="'+row[0].qElemNumber+'">';

                            //console.log(appendStuff);
                            if(newRow === 0)
                            {



                                if( keyUp === 0 && morePressed === 1)
                                {

                                    if( morePressed == 1)
                                    {
                                        appendStuff+="<td class='index_col'>#"+(lastrow)+"</td>";    
                                    }
                                    
                                    appendStuff+="<td>"+cell.qText+"</td>";
                                    
                                }
                                else
                                {
                                    appendStuff+="<td>#"+(lastrow+keyUp)+"</td>";
                                    appendStuff+="<td>"+cell.qText+"</td>";

                                }
                                

                                newRow=1;
                            }
                            else
                            {

                                if(cell.qIsOtherCell){
                                    cell.qText= dimensionInfo[key].othersLabel;
                                    
                                    
                                }
                                appendStuff+="<td";
                                if( !isNaN (cell.qNum))
                                {

                                    appendStuff+="class='numeric'";
                                    
                                }
                                appendStuff+='>'+cell.qText+'</td>';
                                appendStuff+="<td>"+cell.qText+"</td>";
                            }

                        });
                    cnt++;

                        lastrowG=lastrow+cnt;    
            
                    
                console.log("after the loop lastrow");
               console.log(lastrowG);
               console.log("the more button -->"+morePressed);
               newRow=0;
               appendStuff +='</tr>';
               //console.log(row);
               var breakline=InitialRows+keyUp+1;
           }

                // console.log("the breakline is"+breakline);
                // console.log("the lastrowG is"+lastrowG);

            });
                return appendStuff;




            }




            var sliderColor={
                type: "number",
                component: "slider",
                label: "Color Range",
                ref: "color.range",
                min: 0,
                max: 100,
                step: 25,
                defaultValue: 50


            };

            var sliderZoom={
                type: "number",
                component: "slider",
                label: "Zoom Range",
                ref: "zoom.range",
                min: 4,
                max: 40,
                step: 4,
                defaultValue: 10

            };

            var complexSliderArea={
                label:"Slider Area",
                ref:"sliders",
                type:"items",
                items:{
                    slider1:sliderColor,
                    slider2:sliderZoom

                }

            };



            var thresshold = {
                ref : "qHyperCubeDef.qInitialDataFetch.0.qHeight",
                translation : "Thresshold",
                type : "number",
                defaultValue : 12
            };

            var datastep={
               ref : "step",
               label:" Data Step",
               translation : "Data Step",
               type : "number",
               defaultValue : 5
           };

           var showIndexes={
                ref:"index.show",
                label:"Show Indexes",
                translation : "Show Indexes",
                component:"switch",
                type:"boolean",
                options:[{
                    value: true,
                    label:"Show"
                 },
                {
                    value: false,
                    label:"Hide"
                }]
           };

           var thressholdArea={
            label:"Thresshold",
            ref:"thressholds",
            type:"items",
            items:{
                thresshold:thresshold,
                datastep:datastep,
                showindexes:showIndexes
            }
        };




        return {  

        /**
        *
        *50 rows (qArea.qHeight)
        *2 columns (qArea.qWidth)
        *
        */
        initialProperties : {  
            qHyperCubeDef : {  
                qDimensions : [],  
                qMeasures : [],  
                qInitialDataFetch : [{  
                    qWidth : 10,  
                    qHeight : 12 
                }]  
            }  
        },  
        definition : 
        {  
            type : "items",  
            component : "accordion",  
            items : {  
                dimensions : {  
                    uses : "dimensions",  
                    min : 1,  
                    max : 5  
                },  
                measures : {  
                    uses : "measures",  
                    min : 1,  
                    max : 2  
                },  
                sorting : {  
                    uses : "sorting"  
                },  
                //Custom Settings  
                settings:{
                    uses: "settings",
                    items:{

                     MyDropdownProp:{
                        type:"string",
                        component:"dropdown",
                        label:"custom dropdown",
                        ref:"customprops.dropdown",
                        options:[{
                            value:"Slash",
                            label:"Get more Data Table"
                        },
                        {
                            value:"George Ezra",
                            label:"Extra feature"
                        },
                        {
                            value:"Chris Cornel",
                            label:"d3.js 3D-donut"
                        },
                        ],
                        defaultValue:"Slash"
                    },
                    initFetchRows : thressholdArea,
                    PieChartAppearance:{
                        component:"buttongroup",
                        label:"visualisation buttongroup",
                        ref:"visualisation.buttongroup",
                        type:"string",
                        options: [{

                            value:"p",
                            label:"Pie Chart",
                            tooltip:"Select for an encharming 3D pie chart Visualisation"
                        },{
                         value:"d",
                         label:"Donut",
                         tooltip:"Select for an encharming 3D donut chart Visualisation"
                     }],
                     defaultValue: "p"
                 },


                 MySliderProp:complexSliderArea,




             }
         },
     }  
 },  
 snapshot : {  
    canTakeSnapshot : true  
},  
paint : function($element,layout) {  










                    //qHeight = layout.myThreshold //ref = myThreshold)

                       // console.log(qHyperCubeDef.qInitialDataFetch);  


                    // var $var=$(document.createElement('h2'));
                    // if( layout.customprops.dropdown == "Chris Cornel"){
                    //     $var.html("d3.js Chart Visualization");
                    // }
                    // else if( layout.customprops.dropdown == "Slash" ){
                    //     $var.html(" Simple Show More data through backendApi.getData");
                    // }
                    // else{
                    //     $var.html(" Extra feature");
                    // }
                    
                    // $element.append($var);

                    var self=this;  
                    var hc=layout.qHyperCube,
                    total_rows=hc.qDataPages[0].qMatrix.length,
                    total_cols=hc.qDimensionInfo.length + hc.qMeasureInfo.length, //aggregation of all cols
                    morebutton = false;




                    /*
                    *layout.qHyperCube.qDataPages[0].qArea.qHeight == initial fetch height!
                    * layout.qHyperCube.qDimensionInfo: dimensions used
                    * layout.qHyperCube.qMeasureInfo: measures used
                    * layout.qHyperCube.qDataPages: the result ---> is an Array
                    * he data is held with qDataPages[0].qDataPages.qMatrix
                    * qDataPages[0].qDataPages.qMatrix is an array of objects (the rows)
                    *
                    */

                    if( layout.customprops.dropdown == "Slash")
                    {  

                        if( dirty === 0)
                        {

                           $element.empty();

                           var dataFrame='<table border="1">';
                           dataFrame+= '<thead>';
                           dataFrame+='<tr>';
                            //console.log( hc.qDimensionInfo.length);
                            dataFrame+='<th class="index_col">Index</th>';
                            hc.qDimensionInfo.forEach( function (cell){

                                dataFrame+='<th>'+cell.qFallbackTitle+'</th>';
                            });

                            
                            hc.qMeasureInfo.forEach( function (cell){
                                dataFrame+='<th>'+cell.qFallbackTitle+'</th>';
                            });

                            dataFrame+='</tr>';
                            dataFrame+='</thead>';

                            dataFrame+='<tbody>';
                            

                            for (var r=0; r < hc.qDataPages[0].qMatrix.length; r++) {
                                var cell=hc.qDataPages[0];




                                        //console.log(cell);  
                                        //console.log(r);
                                        dataFrame+='<tr class="  data state'+cell.qMatrix[r][0].qState+'" data-value="'+cell.qMatrix[r][0].qElemNumber+'">';
                                        console.log(cell.qMatrix[0].length);
                                        for (var c =0; c < cell.qMatrix[r].length; c++) {
                                            //console.log(cell.qMatrix[c]);
                                             //console.log(c);

                                             if( c === 0)
                                             {
                                                dataFrame += '<td class="index_col">';
                                                dataFrame += "#"+(r+1);
                                                dataFrame += '</td>';
                                                dataFrame +='<td>';
                                                dataFrame += cell.qMatrix[r][c].qText;
                                                dataFrame += '</td>';  
                                                lastrowG=r+1;  
                                            }
                                            else
                                            {

                                                dataFrame += '<td>';
                                                dataFrame += cell.qMatrix[r][c].qText;
                                                dataFrame += '</td>';
                                            }
                                        }
                                        dataFrame += '</tr>';


                                    }

                                    dataFrame+='</tbody>';
                                    dataFrame+='</table>';
                                    console.log("First created lastRog========>" +lastrowG);
                                    lastrowG=hc.qDataPages[0].qMatrix.length+1;



                                    if ( hc.qSize.qcy > total_rows ) {
                                        dataFrame += "<button class='more buttonExte'>Expand Results</button>";
                                        morebutton = true;
                                    }




                                    

                                    $element.append(dataFrame).fadeIn('slow');   



                                    if(morebutton)
                                    {


                                        var keepRows=total_rows;


                                        $element.find(".more").on("qv-activate",function(){
                                                            var requestPage =[{
                                                                qTop:total_rows,
                                                                qLeft: 0,
                                                                qWidth: total_cols,
                                                            qHeight:layout.step  //augments with thresshold number
                                                        }];


                                                        morePressed++;
                                                        self.backendApi.getData(requestPage).then( function (dataPages){
                                                            total_rows+= dataPages[0].qMatrix.length;

                                                            dirty=1;
                                                            if( total_rows >= hc.qSize.qcy){
                                                                $element.find('.more').hide();
                                                                var $button="<button class=' buttonExteMinimize'>Minimize Results</button>";
                                                                $element.append($button);  


                                                                $element.find(".buttonExteMinimize").on("qv-activate",function(){
                                                                    var requestPage =[{
                                                                        qTop:0,
                                                                        qLeft: 0,
                                                                        qWidth: total_cols,
                                                                                            qHeight:layout.step  //augments with thresshold number
                                                                                        }];

                                                                                        self.backendApi.getData(requestPage).then( function (dataPages){
                                                                                            total_rows=dataPages[0].qMatrix.length;
                                                                                            $element.find("tbody").empty();
                                                                                            let intitalize_frame;
                                                                                            lastrowG=1;
                                                                                            console.log(lastrowG);
                                                                                            morePressed=0;
                                                                                            dirty=0;
                                                                                            intitalize_frame=rowsMaker($element,dataPages[0].qMatrix, hc.qDimensionInfo,lastrowG,1);
                                                                                            $element.find("tbody").append(intitalize_frame);
                                                                                            $element.find(".buttonExteMinimize").hide();
                                                                                            $element.find('.more').show();

                                                                                        });
                                                                                    });


                                                            }

                                                            var new_dataFrame;



                                                            new_dataFrame=rowsMaker($element,dataPages[0].qMatrix, hc.qDimensionInfo,lastrowG,keepRows);



                                                            $element.find("tbody").append(new_dataFrame);
                                                            $element.find("tr").show('slow');
                                                            $element.find('tr').on('qv-activate', function() {
                                                                if(this.hasAttribute("data-value")) {
                                                                   var value = parseInt(this.getAttribute("data-value"), 10), dim = 0;
                                                                   self.selectValues(dim, [value], true);
                                                                   this.classList.toggle("selected");

                                                               }
                                                           });
                                                        });

                                        });




                                    }






                            $(document).ready(function()
                            {   

                                console.log("inside");
                                if(layout.index.show === false)
                                {
                                    console.log("hide me");
                                    $(".index_col").hide(250);
                                }
                                else
                                {
                                    $(".index_col").show(550);   
                                }

                            });



                            $element.find('tr').on('qv-activate', function() {
                                   // console.log("activated");
                                    //console.log(this);
                                    if(this.hasAttribute("data-value")) {
                                       var value = parseInt(this.getAttribute("data-value"), 10), dim = 0;
                                       self.selectValues(dim, [value], true);
                                       this.classList.toggle("selected");


                                   }
                               });


}    

}
else if( layout.customprops.dropdown == "George Ezra")
{
    var showme="<h1 style='font-size:25px;'>Impossible Bubble Crush </h1>";
    $element.empty();   
    $element.append(showme);

                          //  console.log(layout);
                            //console.log(layout.color.range);
                            var width =950,
                            height = 500;

                            var NodesTotal=hc.qDataPages[0].qMatrix.length;
                              //console.log(NodesTotal);
                              //console.log(layout.zoom.range)
                              var nodes = d3.range(NodesTotal).map(function() { return {radius: Math.random() * layout.zoom.range + 4}; }),
                              root = nodes[0];

                            //HERE WE PLAY WITH DIFFERENT COLORS SCHEMES
                            var color; 
                           // console.log(layout.color.range);
                           if( layout.color.range >= 0 && layout.color.range <= 25)
                           {
                            color= d3.scale.category10();
                        }
                        else if( layout.color.range > 26 && layout.color.range <= 50)
                        {
                            color= d3.scale.category20();
                        }
                        else if( layout.color.range > 51 && layout.color.range <= 75)
                        {
                            color= d3.scale.category20b();
                        }
                        else 
                        {
                            color= d3.scale.category20c();
                        }

                           // console.log(color);
                           root.radius = 0;
                           root.fixed = true;

                           var force = d3.layout.force()
                           .gravity(0.05)
                           .charge(function(d, i) { return i ? 0 : -2000; })
                           .nodes(nodes)
                           .size([width, height]);

                           force.start();

                           





                           var id="container_"+layout.qInfo.qId;

                           if( document.getElementById(id)){
                            $("#"+id).empty();
                        }
                        else{
                            $element.append($('<div  />;').attr("id",id).width(width).height(height));
                        }


                        var svg = d3.select("#"+id).append("svg").attr("width","100%").attr("height","100%");

                            //  svg.append("g").attr("id","salesDonut");

                            svg.selectAll("circle")
                            .data(nodes.slice(1))
                            .enter().append("circle")
                            .attr("r", function(d) { return d.radius; })
                            .style("fill", function(d, i) { 

                                // console.log("the i is");
                                // console.log(color);
                                // console.log(color(i%3));
                                return color(i % 3); });






                            force.on("tick", function(e) {
                              var q = d3.geom.quadtree(nodes),
                              i = 0,
                              n = nodes.length;

                              while (++i < n) q.visit(collide(nodes[i]));

                              svg.selectAll("circle")
                              .attr("cx", function(d) { return d.x; })
                              .attr("cy", function(d) { return d.y; });
                          });

                            svg.on("mousemove", function() {
                              var p1 = d3.mouse(this);
                              root.px = p1[0];
                              root.py = p1[1];
                              force.resume();
                          });

                            function collide(node) {
                              var r = node.radius + 16,
                              nx1 = node.x - r,
                              nx2 = node.x + r,
                              ny1 = node.y - r,
                              ny2 = node.y + r;
                              return function(quad, x1, y1, x2, y2) {
                                if (quad.point && (quad.point !== node)) {
                                  var x = node.x - quad.point.x,
                                  y = node.y - quad.point.y,
                                  l = Math.sqrt(x * x + y * y),
                                  r = node.radius + quad.point.radius;
                                  if (l < r) {
                                    l = (l - r) / l * .5;
                                    node.x -= x *= l;
                                    node.y -= y *= l;
                                    quad.point.x += x;
                                    quad.point.y += y;
                                }
                            }
                            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                        };
                    }






                }
                else
                {

                    var width= $element.width();
                    var height=$element.height();
                    var hcub=layout.qHyperCube,
                    arrayofMesures=hc.qDataPages[0].qMatrix;
                                            //console.log(hc.qMeasureInfo);
                                            var legendTitle=hc.qMeasureInfo[0].qFallbackTitle;

                                            
                                            var keepMaxObjects=[],tmp;

                                            var salesData=[
                                            {label:"Basic", color:"#3366CC"},
                                            {label:"Plus", color:"#DC3912"},
                                            {label:"Elite", color:"#109618"},
                                            {label:"Lite", color:"#FF9900"},
                                            {label:"Delux", color:"#990099"}
                                            ];


                                            function top5Data(){
                                                return salesData.map(function(d,key){ 
                                                             //console.log(key);


                                                          //  console.log(keepMaxObjects[key][1]);
                                                          return {label:keepMaxObjects[key][0].qText, value:keepMaxObjects[key][1].qNum, color:d.color};});
                                            }


                                                //************ PASS 5 MAX CELLS (both names and values and learn about maping function )**************//)

                                                tmp= arrayofMesures[0][1];


                                                arrayofMesures.sort(function (a,b) {
                                                  // console.log(parseFloat(a[1].qNum)- parseFloat(b[1].qNum));
                                                  return parseFloat(a[1].qNum)- parseFloat(b[1].qNum);
                                              });


                                                // arrayofMesures.forEach(function(cell){
                                                //     console.log(cell[1].qNum);
                                                // });

                                                var i=0;
                                                while(i !== 5)
                                                {
                                                keepMaxObjects.push(arrayofMesures[arrayofMesures.length-1-i]); // keep top 5 objects
                                                i++;
                                            }
                                            //console.log(keepMaxObjects);




                                            var id="container_"+layout.qInfo.qId;

                                            if( document.getElementById(id)){
                                                $("#"+id).empty();
                                            }
                                            else{
                                                $element.append($('<div class="container_svg" />;').attr("id",id).width(width).height(height));
                                            }







                                            var svg = d3.select("#"+id).append("svg").attr("width","100%").attr("height",300);

                                            svg.append("g").attr("id","salesDonut");
                                            svg.append("g").attr("id","quotesDonut");

                                            if( layout.visualisation.buttongroup == "p")
                                            {
                                                        //console.log(randomData());
                                                       // console.log("hello piech");
                                                       // Donut3D.draw("salesDonut", randomData(), 150, 150, 130, 100, 30, 0.4);
                                                       Donut3D.draw("quotesDonut", top5Data(), 150, 150, 130, 100, 30, 0);

                                                   }
                                                   else{   

                                                           // console.log("hello Donut");
                                                           Donut3D.draw("salesDonut", top5Data(), 150, 150, 130, 100, 30, 0.4);
                                                       }



                                                    //  function changeData()
                                                    //  {

                                                    //     Donut3D.transition("salesDonut", randomData(), 130, 100, 30, 0.4);
                                                    //     Donut3D.transition("quotesDonut", randomData(), 130, 100, 30, 0);
                                                    // }




                                                    var legendFrame='<table border="0" class="legendTable">';
                                                    legendFrame+= '<thead>';
                                                    
                                                    //console.log( hc.qDimensionInfo.length);


                                                    legendFrame+='<th>'+legendTitle+'</th>';

                                                    legendFrame+='</thead>';

                                                    legendFrame+='<tbody>';
                                                    keepMaxObjects.forEach( function (cell,key){

                                                     console.log(cell);
                                                        // console.log(cell[1].qElemNumber);
                                                        legendFrame+='<tr class="selectable" data state'+cell[0].qState.toUpperCase()+'" data-value="'+cell[0].qElemNumber+'">'; 
                                                        legendFrame+='<td><span class="color_bullet" style="background-color:'+salesData[key].color+';"></span>';  
                                                        //cell[1].qNum.toFixed(2)+
                                                        legendFrame+=cell[0].qText+'</td>';
                                                        legendFrame+='</tr>';
                                                    });



                                                    $element.find('tr').on('qv-activate', function() {
                                                        console.log("act tableee");
                                                        if(this.hasAttribute("data-value")) {
                                                           var value = parseInt(this.getAttribute("data-value"), 10), dim = 0;
                                                           self.selectValues(dim, [value], true);
                                                           this.classList.toggle("selected");


                                                       }
                                                   });
                                                    legendFrame+='</tbody>';

                                                    legendFrame+='</table>';

                                                    


                                                    $element.append(legendFrame).fadeIn('slow'); 















                                                }

                                                return qlik.Promise.resolve();











                                            }  
                                        };  
                                    });  