(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Arrays,Sitelet,Bar,d3,IntrinsicFunctionProxy,UI,Next,Var1,Order,Var,View1,Doc,Html,List,Attr,T,Number,Trans,SvgElements,View,Seq,An,Interpolation,Easing,JQueryUI,SliderConfiguration,Slider,GoogleDashboard,Html1,Operators,Default,Slider1,Client,Gender,Unchecked,google,visualization,DataTable,document,PieChart,Table,Hello,Phoneword,Strings,String,Scatter,Point,Key,Model1,Model,Collections,ResizeArray,ResizeArrayProxy,PointModel,setInterval,Math,Operators1,jQuery,clearInterval;
 Runtime.Define(Global,{
  Sitelet:{
   Bar:{
    Order:Runtime.Class({},{
     Show:function(order)
     {
      return order.$==2?"Asc":order.$==1?"Desc":"None";
     }
    }),
    data:Runtime.Field(function()
    {
     return Arrays.mapi(function(idx)
     {
      return function(x)
      {
       return{
        X:x,
        Index:idx,
        OldIndex:idx
       };
      };
     },Bar.dataset());
    }),
    dataset:Runtime.Field(function()
    {
     return[5,10,13,19,21,25,22,18,15,13,11,12,15,20,18,17,16,18,23,25];
    }),
    h:Runtime.Field(function()
    {
     return 250;
    }),
    main:function()
    {
     var xScale,yScale,svg,oldOrder,order,arg00,arg10,bars;
     xScale=d3.scale.ordinal().domain(d3.range(IntrinsicFunctionProxy.GetLength(Bar.dataset()))).rangeRoundBands([0,Bar.w()],0.5);
     yScale=d3.scale.linear().domain([0,d3.max(Bar.dataset())]).range([0,Bar.h()]);
     svg=d3.select("#bar-chart").append("svg").attr("width",Bar.w()).attr("height",Bar.h());
     svg.append("g").attr("id","bar-svg");
     oldOrder=Var1.Create(Runtime.New(Order,{
      $:0
     }));
     order=Var1.Create(Runtime.New(Order,{
      $:0
     }));
     arg00=function(order1)
     {
      var _order_;
      if(order1.$==2)
       {
        Var.Set(oldOrder,Runtime.New(Order,{
         $:2
        }));
        return Arrays.mapi(function(idx)
        {
         return function(d)
         {
          return{
           X:d.X,
           Index:idx,
           OldIndex:d.Index
          };
         };
        },Arrays.sortBy(function(y)
        {
         return y.X;
        },Bar.data()));
       }
      else
       {
        if(order1.$==1)
         {
          Var.Set(oldOrder,Runtime.New(Order,{
           $:1
          }));
          return Arrays.mapi(function(idx)
          {
           return function(d)
           {
            return{
             X:d.X,
             Index:idx,
             OldIndex:d.Index
            };
           };
          },Arrays.sortBy(function(y)
          {
           return y.X;
          },Bar.data()).slice().reverse());
         }
        else
         {
          _order_=Var1.Get(oldOrder);
          Var.Set(oldOrder,Runtime.New(Order,{
           $:0
          }));
          return _order_.$==2?Arrays.mapi(function(idx)
          {
           return function(d)
           {
            var inputRecord;
            inputRecord=(Bar.data())[idx];
            return{
             X:inputRecord.X,
             Index:inputRecord.Index,
             OldIndex:d.Index
            };
           };
          },Arrays.sortBy(function(y)
          {
           return y.X;
          },Bar.data())):_order_.$==1?Arrays.mapi(function(idx)
          {
           return function(d)
           {
            var inputRecord;
            inputRecord=(Bar.data())[idx];
            return{
             X:inputRecord.X,
             Index:inputRecord.Index,
             OldIndex:d.Index
            };
           };
          },Arrays.sortBy(function(y)
          {
           return y.X;
          },Bar.data()).slice().reverse()):Bar.data();
         }
       }
     };
     arg10=order.get_View();
     bars=View1.Map(arg00,arg10);
     Doc.RunById("bar-svg",Doc.EmbedView(View1.Map(function(datums)
     {
      return Doc.Concat(Arrays.map(function(y)
      {
       return Bar.render(xScale,yScale,y);
      },datums));
     },bars)));
     return Doc.RunById("bar",Html.Div(List.ofArray([Attr.Style("margin-bottom","10px")]),List.ofArray([Doc.TextNode("Order: "),Doc.Select(Runtime.New(T,{
      $:0
     }),function(arg001)
     {
      return Order.Show(arg001);
     },List.ofArray([Runtime.New(Order,{
      $:0
     }),Runtime.New(Order,{
      $:2
     }),Runtime.New(Order,{
      $:1
     })]),order)])));
    },
    render:function(xScale,yScale,datum)
    {
     var index,oldIndex,x,x1,trans,arg30;
     index=datum.Index;
     oldIndex=xScale(datum.OldIndex);
     x=Number(datum.X);
     x1=Bar.simpleTrans();
     trans=Trans.Enter(function(x2)
     {
      return Bar.simpleAnim(oldIndex,x2);
     },x1);
     arg30=function(value)
     {
      return Global.String(value);
     };
     return Doc.Concat(List.ofArray([SvgElements.Rect(List.ofArray([Attr.Create("y",Global.String(Bar.h()-yScale(x))),Attr.Create("width",Global.String(xScale.rangeBand())),Attr.Create("height",Global.String(yScale(x))),Attr.Create("fill","steelblue"),Attr.Animated("x",trans,View1.Map(function(x2)
     {
      return x2;
     },View.Const(xScale(index))),arg30)]),Runtime.New(T,{
      $:0
     })),SvgElements.Text(Seq.toList(Seq.delay(function()
     {
      return Seq.append([Attr.Create("text-anchor","middle")],Seq.delay(function()
      {
       return Seq.append([Attr.Create("font-family","sans-serif")],Seq.delay(function()
       {
        return Seq.append([Attr.Create("font-size","11px")],Seq.delay(function()
        {
         return Seq.append([Attr.Create("fill","white")],Seq.delay(function()
         {
          var _,arg301;
          if(datum.OldIndex===index)
           {
            _=[Attr.Create("x",Global.String(xScale(index)+7))];
           }
          else
           {
            arg301=function(value)
            {
             return Global.String(value);
            };
            _=[Attr.Animated("x",trans,View1.Map(function(x2)
            {
             return x2;
            },View.Const(xScale(index)+7)),arg301)];
           }
          return Seq.append(_,Seq.delay(function()
          {
           return[Attr.Create("y",Global.String(Bar.h()-yScale(x)+15))];
          }));
         }));
        }));
       }));
      }));
     })),List.ofArray([Doc.TextNode(Global.String(x))]))]));
    },
    simpleAnim:function(x,y)
    {
     return An.Simple(Interpolation.get_Double(),Easing.get_CubicInOut(),400,x,y);
    },
    simpleTrans:Runtime.Field(function()
    {
     return Trans.Create(function(x)
     {
      return function(y)
      {
       return Bar.simpleAnim(x,y);
      };
     });
    }),
    w:Runtime.Field(function()
    {
     return 600;
    })
   },
   Client:{
    main:function()
    {
     var config,slider,x;
     config=SliderConfiguration.New();
     config.max=60;
     config.min=20;
     config.values=[25,55];
     config.range=true;
     slider=Slider.New1(config);
     slider.OnSlide(function()
     {
      var values,arg00;
      values=slider.get_Values();
      arg00=GoogleDashboard.age();
      return(Runtime.Tupled(function(arg10)
      {
       return Var.Set(arg00,arg10);
      }))([values[0],values[1]]);
     });
     x=Operators.add(Default.Div(List.ofArray([Default.Attr().Class("container")])),List.ofArray([Operators.add(Default.Div(List.ofArray([Default.Attr().Class("example")])),List.ofArray([Default.H1(List.ofArray([Default.Text("Slider"),Default.Attr().Class("page-header")])),Operators.add(Default.Div(List.ofArray([Default.Attr().NewAttr("id","slider-container")])),List.ofArray([Default.Div(List.ofArray([Default.Attr().NewAttr("id","slider")]))]))]))]));
     Operators.OnAfterRender(function()
     {
      return Slider1.main();
     },x);
     return x;
    }
   },
   Controls:{
    EntryPoint:Runtime.Class({
     get_Body:function()
     {
      return Client.main();
     }
    })
   },
   GoogleDashboard:{
    Gender:Runtime.Class({},{
     Show:function(gender)
     {
      return gender.$==1?"Male":gender.$==2?"None":"Female";
     }
    }),
    age:Runtime.Field(function()
    {
     return Var1.Create([20,60]);
    }),
    data:Runtime.Field(function()
    {
     return List.ofArray([{
      Name:"Michael",
      Gender:Runtime.New(Gender,{
       $:1
      }),
      Age:24,
      DonutsEaten:5
     },{
      Name:"Elisa",
      Gender:Runtime.New(Gender,{
       $:0
      }),
      Age:31,
      DonutsEaten:4
     },{
      Name:"John",
      Gender:Runtime.New(Gender,{
       $:1
      }),
      Age:40,
      DonutsEaten:1
     },{
      Name:"Jessica",
      Gender:Runtime.New(Gender,{
       $:0
      }),
      Age:37,
      DonutsEaten:3
     },{
      Name:"Margareth",
      Gender:Runtime.New(Gender,{
       $:0
      }),
      Age:53,
      DonutsEaten:2
     },{
      Name:"Miranda",
      Gender:Runtime.New(Gender,{
       $:0
      }),
      Age:25,
      DonutsEaten:3
     },{
      Name:"Jack",
      Gender:Runtime.New(Gender,{
       $:1
      }),
      Age:26,
      DonutsEaten:2
     }]);
    }),
    gender:Runtime.Field(function()
    {
     return Var1.Create(Runtime.New(Gender,{
      $:2
     }));
    }),
    main:function()
    {
     var arg00,arg10,arg20,persons,arg101;
     arg00=function(g)
     {
      return Runtime.Tupled(function(age)
      {
       return List.filter(function(x)
       {
        return x.Age<age[1]?x.Age>age[0]:false;
       },g.$==2?GoogleDashboard.data():List.filter(function(x)
       {
        return Unchecked.Equals(x.Gender,g);
       },GoogleDashboard.data()));
      });
     };
     arg10=GoogleDashboard.gender().get_View();
     arg20=GoogleDashboard.age().get_View();
     persons=View1.Map2(arg00,arg10,arg20);
     Doc.RunById("google",Doc.EmbedView(View1.Map(function(data)
     {
      return GoogleDashboard.render(data);
     },persons)));
     arg101=GoogleDashboard.age().get_View();
     Doc.RunById("min-max",Doc.TextView(View1.Map(Runtime.Tupled(function(tupledArg)
     {
      var max;
      max=tupledArg[1];
      return"Min: "+Global.String(tupledArg[0])+" Max: "+Global.String(max);
     }),arg101)));
     return Doc.RunById("google-dash",Html.Div(Runtime.New(T,{
      $:0
     }),List.ofArray([Doc.TextNode("Gender Selection: "),Doc.Select(Runtime.New(T,{
      $:0
     }),function(arg001)
     {
      return Gender.Show(arg001);
     },List.ofArray([Runtime.New(Gender,{
      $:2
     }),Runtime.New(Gender,{
      $:0
     }),Runtime.New(Gender,{
      $:1
     })]),GoogleDashboard.gender())])));
    },
    render:function(data)
    {
     var dataTable,e,pie,options,_dataTable_;
     dataTable=new DataTable();
     dataTable.addColumn("string","Name");
     dataTable.addColumn("number","Donuts Eaten");
     dataTable.addRows(data.get_Length());
     Seq.iteri(function(idx)
     {
      return function(person)
      {
       dataTable.setCell(idx,0,person.Name);
       return dataTable.setCell(idx,1,person.DonutsEaten);
      };
     },data);
     e=document.getElementById("google-pie");
     pie=new PieChart(e);
     options={};
     pie.draw(dataTable,options);
     _dataTable_=new DataTable();
     _dataTable_.addColumn("string","Name");
     _dataTable_.addColumn("string","Gender");
     _dataTable_.addColumn("number","Age");
     _dataTable_.addColumn("number","Donuts Eaten");
     _dataTable_.addRows(data.get_Length());
     Seq.iteri(function(idx)
     {
      return function(person)
      {
       _dataTable_.setCell(idx,0,person.Name);
       _dataTable_.setCell(idx,1,person.Gender.$==0?"Female":"Male");
       _dataTable_.setCell(idx,2,person.Age);
       return _dataTable_.setCell(idx,3,person.DonutsEaten);
      };
     },data);
     (new Table(document.getElementById("google-table"))).draw(_dataTable_,{});
     return Doc.get_Empty();
    }
   },
   Hello:{
    inputField:Runtime.Field(function()
    {
     return Doc.Input(Runtime.New(T,{
      $:0
     }),Hello.nameVar());
    }),
    label:Runtime.Field(function()
    {
     return Doc.TextView(View1.Map(function(x)
     {
      return"Hello "+x+"!";
     },Hello.nameVar().get_View()));
    }),
    main:function()
    {
     return Html.Div0(List.ofArray([Html.Label0(List.ofArray([Doc.TextNode("Name:")])),Html.Div0(List.ofArray([Hello.inputField()])),Html.H20(List.ofArray([Hello.label()]))]));
    },
    nameVar:Runtime.Field(function()
    {
     return Var1.Create("");
    })
   },
   Phoneword:{
    inputField:Runtime.Field(function()
    {
     return Doc.Input(Runtime.New(T,{
      $:0
     }),Phoneword.phoneVar());
    }),
    label:Runtime.Field(function()
    {
     return Doc.TextView(View1.Map(function(raw)
     {
      return Phoneword.toNumber(raw);
     },Phoneword.phoneVar().get_View()));
    }),
    main:function()
    {
     return Html.Div0(List.ofArray([Html.Label0(List.ofArray([Doc.TextNode("Phoneword:")])),Html.Div0(List.ofArray([Phoneword.inputField()])),Html.H20(List.ofArray([Phoneword.label()]))]));
    },
    phoneVar:Runtime.Field(function()
    {
     return Var1.Create("1-645-COMPANY");
    }),
    toNumber:function(raw)
    {
     return Strings.concat("",Seq.choose(function(x)
     {
      var xString,result;
      xString=String.fromCharCode(x);
      if(" -0123456789".indexOf(xString)!=-1)
       {
        return{
         $:1,
         $0:xString
        };
       }
      else
       {
        result=Phoneword.translate(xString);
        return result.$==1?{
         $:1,
         $0:Global.String(result.$0)
        }:{
         $:0
        };
       }
     },raw.toUpperCase()));
    },
    translate:function(x)
    {
     var activePatternResult,activePatternResult1,activePatternResult2;
     activePatternResult=Phoneword["|Contains|_|"]("ABC",x);
     if(activePatternResult.$==1)
      {
       return{
        $:1,
        $0:2
       };
      }
     else
      {
       activePatternResult1=Phoneword["|Contains|_|"]("DEF",x);
       if(activePatternResult1.$==1)
        {
         return{
          $:1,
          $0:3
         };
        }
       else
        {
         activePatternResult2=Phoneword["|Contains|_|"]("GHI",x);
         return activePatternResult2.$==1?{
          $:1,
          $0:4
         }:Phoneword["|Contains|_|"]("JKL",x).$==1?{
          $:1,
          $0:5
         }:Phoneword["|Contains|_|"]("MNO",x).$==1?{
          $:1,
          $0:6
         }:Phoneword["|Contains|_|"]("PQRS",x).$==1?{
          $:1,
          $0:7
         }:Phoneword["|Contains|_|"]("TUV",x).$==1?{
          $:1,
          $0:8
         }:Phoneword["|Contains|_|"]("WXYZ",x).$==1?{
          $:1,
          $0:9
         }:{
          $:0
         };
        }
      }
    },
    "|Contains|_|":function(str,x)
    {
     return str.indexOf(x)!=-1?{
      $:1,
      $0:x
     }:{
      $:0
     };
    }
   },
   Scatter:{
    Point:Runtime.Class({},{
     Create:function(x,y)
     {
      return Runtime.New(Point,{
       X:x,
       Y:y,
       Key:Key.Fresh()
      });
     }
    }),
    PointModel:Runtime.Class({
     Add:function(point)
     {
      this.arr.Add(point);
      return Model1.Update(function()
      {
       return null;
      },this.model);
     },
     get_MaxX:function()
     {
      return Number(Seq.maxBy(function(x)
      {
       return x.X;
      },this.arr).X);
     },
     get_MaxY:function()
     {
      return Number(Seq.maxBy(function(x)
      {
       return x.Y;
      },this.arr).Y);
     },
     get_View:function()
     {
      return Model.View(this.model);
     }
    },{
     New:function(points)
     {
      var r;
      r=Runtime.New(this,{});
      r.arr=ResizeArrayProxy.New1();
      r.arr.AddRange(points);
      r.model=Model1.Create(function(x)
      {
       return x.ToArray();
      },r.arr);
      return r;
     }
    }),
    h:Runtime.Field(function()
    {
     return 300;
    }),
    main:function()
    {
     var model,xScale,yScale,rScale,self,ps,xAxis,self1,ps1,yAxis,svg,_scale_;
     model=PointModel.New(Scatter.points());
     xScale=d3.scale.linear().domain([0,model.get_MaxX()]).range([Scatter.padding(),Scatter.w()-Scatter.padding()*2]);
     yScale=d3.scale.linear().domain([0,model.get_MaxY()]).range([Scatter.h()-Scatter.padding(),Scatter.padding()]);
     rScale=d3.scale.linear().domain([0,model.get_MaxY()]).range([2,5]);
     self=d3.svg.axis().scale(xScale).orient("bottom");
     ps=[5];
     xAxis=self.ticks.apply(self,[].concat(ps));
     self1=d3.svg.axis().scale(yScale).orient("left");
     ps1=[5];
     yAxis=self1.ticks.apply(self1,[].concat(ps1));
     svg=d3.select("#scatter").append("svg").attr("width",Scatter.w()).attr("height",Scatter.h());
     svg.append("g").attr("id","scatter-svg").style("fill","steelblue");
     svg.append("g").attr("class","axis").attr("transform","translate(0,"+Global.String(Scatter.h()-Scatter.padding())+")").call(function(x)
     {
      return xAxis(x);
     });
     svg.append("g").attr("class","axis").attr("transform","translate("+Global.String(Scatter.padding())+",0)").call(function(x)
     {
      return yAxis(x);
     });
     _scale_=function(point)
     {
      return Scatter.scale(xScale,yScale,rScale,point);
     };
     Doc.RunById("scatter-svg",Doc.ConvertBy(function(m)
     {
      return m.Key;
     },function(point)
     {
      return Scatter.render(_scale_,point);
     },model.get_View()));
     setInterval(function()
     {
      return model.Add(Point.Create(Math.floor(Math.random()*model.get_MaxX()),Math.floor(Math.random()*model.get_MaxY())));
     },1000);
     return;
    },
    padding:Runtime.Field(function()
    {
     return 30;
    }),
    points:Runtime.Field(function()
    {
     return List.map(function()
     {
      return Point.Create(Math.floor(Math.random()*Scatter.range()),Math.floor(Math.random()*Scatter.range()));
     },Seq.toList(Operators1.range(0,19)));
    }),
    range:Runtime.Field(function()
    {
     return Math.random()*1000;
    }),
    render:function(scale,point)
    {
     var patternInput,r,cy;
     patternInput=scale(point);
     r=patternInput[2];
     cy=patternInput[1];
     return SvgElements.Circle(List.ofArray([Attr.Create("cx",Global.String(patternInput[0])),Attr.Create("cy",Global.String(cy)),Attr.Create("r",Global.String(r))]),Runtime.New(T,{
      $:0
     }));
    },
    scale:function(xScale,yScale,rScale,point)
    {
     return[xScale(Number(point.X)),yScale(Number(point.Y)),rScale(Number(point.Y))];
    },
    w:Runtime.Field(function()
    {
     return 500;
    })
   },
   Slider:{
    fade:Runtime.Field(function()
    {
     var arg00,arg10;
     arg00=Interpolation.get_Double();
     arg10=Easing.get_CubicInOut();
     return function(arg30)
     {
      return function(arg40)
      {
       return An.Simple(arg00,arg10,1000,arg30,arg40);
      };
     };
    }),
    fadeInTrans:Runtime.Field(function()
    {
     return Trans.Enter(function()
     {
      return((Slider1.fade())(0))(1);
     },Trans.Create(Slider1.fade()));
    }),
    fadeOutTrans:Runtime.Field(function()
    {
     return Trans.Enter(function()
     {
      return((Slider1.fade())(1))(0);
     },Trans.Create(Slider1.fade()));
    }),
    main:function()
    {
     var x,timer;
     Doc.RunById("slider",Doc.EmbedView(View1.Map(function(settings)
     {
      return Slider1.render(settings);
     },Slider1.settingsVar().get_View())));
     x=setInterval(function()
     {
      var settingsVal,matchValue,matchValue1,x1,y,x2,y1,x3,y2;
      settingsVal=Var1.Get(Slider1.settingsVar());
      matchValue=settingsVal.Hover;
      if(matchValue)
       {
        return null;
       }
      else
       {
        matchValue1=settingsVal.Imgs;
        if(matchValue1[0]===6)
         {
          if(matchValue1[1]===7)
           {
            return Var.Set(Slider1.settingsVar(),{
             Imgs:[7,1],
             Hover:settingsVal.Hover,
             Direction:settingsVal.Direction
            });
           }
          else
           {
            x1=matchValue1[0];
            y=matchValue1[1];
            return Var.Set(Slider1.settingsVar(),{
             Imgs:[x1+1,y+1],
             Hover:settingsVal.Hover,
             Direction:settingsVal.Direction
            });
           }
         }
        else
         {
          if(matchValue1[0]===7)
           {
            if(matchValue1[1]===1)
             {
              return Var.Set(Slider1.settingsVar(),{
               Imgs:[1,2],
               Hover:settingsVal.Hover,
               Direction:settingsVal.Direction
              });
             }
            else
             {
              x2=matchValue1[0];
              y1=matchValue1[1];
              return Var.Set(Slider1.settingsVar(),{
               Imgs:[x2+1,y1+1],
               Hover:settingsVal.Hover,
               Direction:settingsVal.Direction
              });
             }
           }
          else
           {
            x3=matchValue1[0];
            y2=matchValue1[1];
            return Var.Set(Slider1.settingsVar(),{
             Imgs:[x3+1,y2+1],
             Hover:settingsVal.Hover,
             Direction:settingsVal.Direction
            });
           }
         }
       }
     },2000);
     timer=Var1.Create(x);
     return jQuery("#slider, #prev-slide, #next-slide").hover(function()
     {
      return clearInterval(Var1.Get(timer));
     },function()
     {
      return Var.Set(timer,setInterval(function()
      {
       var settingsVal,matchValue,matchValue1,arg00,Direction,x1,y,arg001,Direction1,arg002,Direction2,x2,y1,arg003,Direction3,x3,y2,arg004,Direction4;
       settingsVal=Var1.Get(Slider1.settingsVar());
       matchValue=settingsVal.Hover;
       if(matchValue)
        {
         return null;
        }
       else
        {
         matchValue1=settingsVal.Imgs;
         if(matchValue1[0]===6)
          {
           if(matchValue1[1]===7)
            {
             arg00=Slider1.settingsVar();
             Direction={
              $:1
             };
             return Var.Set(arg00,{
              Imgs:[7,1],
              Hover:settingsVal.Hover,
              Direction:Direction
             });
            }
           else
            {
             x1=matchValue1[0];
             y=matchValue1[1];
             arg001=Slider1.settingsVar();
             Direction1={
              $:1
             };
             return Var.Set(arg001,{
              Imgs:[x1+1,y+1],
              Hover:settingsVal.Hover,
              Direction:Direction1
             });
            }
          }
         else
          {
           if(matchValue1[0]===7)
            {
             if(matchValue1[1]===1)
              {
               arg002=Slider1.settingsVar();
               Direction2={
                $:1
               };
               return Var.Set(arg002,{
                Imgs:[1,2],
                Hover:settingsVal.Hover,
                Direction:Direction2
               });
              }
             else
              {
               x2=matchValue1[0];
               y1=matchValue1[1];
               arg003=Slider1.settingsVar();
               Direction3={
                $:1
               };
               return Var.Set(arg003,{
                Imgs:[x2+1,y1+1],
                Hover:settingsVal.Hover,
                Direction:Direction3
               });
              }
            }
           else
            {
             x3=matchValue1[0];
             y2=matchValue1[1];
             arg004=Slider1.settingsVar();
             Direction4={
              $:1
             };
             return Var.Set(arg004,{
              Imgs:[x3+1,y2+1],
              Hover:settingsVal.Hover,
              Direction:Direction4
             });
            }
          }
        }
      },2000));
     });
    },
    render:function(settings)
    {
     return Doc.Concat(Seq.toList(Seq.delay(function()
     {
      var matchValue,_,arg30,arg301,arg302,arg303;
      matchValue=settings.Direction;
      if(matchValue.$==0)
       {
        arg30=function(value)
        {
         return Global.String(value);
        };
        arg301=function(value)
        {
         return Global.String(value);
        };
        _=[Doc.Concat(List.ofArray([Doc.Element("img",List.ofArray([Attr.Create("src","http://placekitten.com/200/200?image="+Global.String(settings.Imgs[0])),Attr.AnimatedStyle("opacity",Slider1.fadeInTrans(),View.Const(1),arg30)]),Runtime.New(T,{
         $:0
        })),Doc.Element("img",List.ofArray([Attr.Create("src","http://placekitten.com/200/200?image="+Global.String(settings.Imgs[1])),Attr.AnimatedStyle("opacity",Slider1.fadeOutTrans(),View.Const(0),arg301)]),Runtime.New(T,{
         $:0
        }))]))];
       }
      else
       {
        arg302=function(value)
        {
         return Global.String(value);
        };
        arg303=function(value)
        {
         return Global.String(value);
        };
        _=[Doc.Concat(List.ofArray([Doc.Element("img",List.ofArray([Attr.Create("src","http://placekitten.com/200/200?image="+Global.String(settings.Imgs[0])),Attr.AnimatedStyle("opacity",Slider1.fadeOutTrans(),View.Const(0),arg302)]),Runtime.New(T,{
         $:0
        })),Doc.Element("img",List.ofArray([Attr.Create("src","http://placekitten.com/200/200?image="+Global.String(settings.Imgs[1])),Attr.AnimatedStyle("opacity",Slider1.fadeInTrans(),View.Const(1),arg303)]),Runtime.New(T,{
         $:0
        }))]))];
       }
      return Seq.append(_,Seq.delay(function()
      {
       var arg10;
       arg10=List.ofArray([Attr.Create("id","prev-slide")]);
       return Seq.append([Doc.Link("Prev",arg10,function()
       {
        var matchValue1,arg00,inputRecord,matchValue2,arg001,inputRecord1;
        matchValue1=Slider1.settingsVar().get_Value().Direction;
        if(matchValue1.$==0)
         {
          arg00=Slider1.settingsVar();
          inputRecord=Slider1.settingsVar().get_Value();
          matchValue2=Slider1.settingsVar().get_Value().Imgs;
          return Var.Set(arg00,{
           Imgs:matchValue2[0]===1?matchValue2[1]===2?[7,1]:[matchValue2[0]-1,matchValue2[1]-1]:matchValue2[0]===7?matchValue2[1]===1?[6,7]:[matchValue2[0]-1,matchValue2[1]-1]:[matchValue2[0]-1,matchValue2[1]-1],
           Hover:inputRecord.Hover,
           Direction:inputRecord.Direction
          });
         }
        else
         {
          arg001=Slider1.settingsVar();
          inputRecord1=Slider1.settingsVar().get_Value();
          return Var.Set(arg001,{
           Imgs:inputRecord1.Imgs,
           Hover:inputRecord1.Hover,
           Direction:{
            $:0
           }
          });
         }
       })],Seq.delay(function()
       {
        var arg101;
        arg101=List.ofArray([Attr.Create("id","next-slide")]);
        return[Doc.Link("Next",arg101,function()
        {
         var matchValue1,arg00,inputRecord,matchValue2,arg001,inputRecord1;
         matchValue1=Slider1.settingsVar().get_Value().Direction;
         if(matchValue1.$==1)
          {
           arg00=Slider1.settingsVar();
           inputRecord=Slider1.settingsVar().get_Value();
           matchValue2=Slider1.settingsVar().get_Value().Imgs;
           return Var.Set(arg00,{
            Imgs:matchValue2[0]===6?matchValue2[1]===7?[7,1]:[matchValue2[0]+1,matchValue2[1]+1]:matchValue2[0]===7?matchValue2[1]===1?[1,2]:[matchValue2[0]+1,matchValue2[1]+1]:[matchValue2[0]+1,matchValue2[1]+1],
            Hover:inputRecord.Hover,
            Direction:inputRecord.Direction
           });
          }
         else
          {
           arg001=Slider1.settingsVar();
           inputRecord1=Slider1.settingsVar().get_Value();
           return Var.Set(arg001,{
            Imgs:inputRecord1.Imgs,
            Hover:inputRecord1.Hover,
            Direction:{
             $:1
            }
           });
          }
        })];
       }));
      }));
     })));
    },
    settingsVar:Runtime.Field(function()
    {
     return Var1.Create({
      Imgs:[1,2],
      Hover:false,
      Direction:{
       $:1
      }
     });
    })
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  Sitelet=Runtime.Safe(Global.Sitelet);
  Bar=Runtime.Safe(Sitelet.Bar);
  d3=Runtime.Safe(Global.d3);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  UI=Runtime.Safe(WebSharper.UI);
  Next=Runtime.Safe(UI.Next);
  Var1=Runtime.Safe(Next.Var1);
  Order=Runtime.Safe(Bar.Order);
  Var=Runtime.Safe(Next.Var);
  View1=Runtime.Safe(Next.View1);
  Doc=Runtime.Safe(Next.Doc);
  Html=Runtime.Safe(Next.Html);
  List=Runtime.Safe(WebSharper.List);
  Attr=Runtime.Safe(Next.Attr);
  T=Runtime.Safe(List.T);
  Number=Runtime.Safe(Global.Number);
  Trans=Runtime.Safe(Next.Trans);
  SvgElements=Runtime.Safe(Html.SvgElements);
  View=Runtime.Safe(Next.View);
  Seq=Runtime.Safe(WebSharper.Seq);
  An=Runtime.Safe(Next.An);
  Interpolation=Runtime.Safe(Next.Interpolation);
  Easing=Runtime.Safe(Next.Easing);
  JQueryUI=Runtime.Safe(WebSharper.JQueryUI);
  SliderConfiguration=Runtime.Safe(JQueryUI.SliderConfiguration);
  Slider=Runtime.Safe(JQueryUI.Slider);
  GoogleDashboard=Runtime.Safe(Sitelet.GoogleDashboard);
  Html1=Runtime.Safe(WebSharper.Html);
  Operators=Runtime.Safe(Html1.Operators);
  Default=Runtime.Safe(Html1.Default);
  Slider1=Runtime.Safe(Sitelet.Slider);
  Client=Runtime.Safe(Sitelet.Client);
  Gender=Runtime.Safe(GoogleDashboard.Gender);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  google=Runtime.Safe(Global.google);
  visualization=Runtime.Safe(google.visualization);
  DataTable=Runtime.Safe(visualization.DataTable);
  document=Runtime.Safe(Global.document);
  PieChart=Runtime.Safe(visualization.PieChart);
  Table=Runtime.Safe(visualization.Table);
  Hello=Runtime.Safe(Sitelet.Hello);
  Phoneword=Runtime.Safe(Sitelet.Phoneword);
  Strings=Runtime.Safe(WebSharper.Strings);
  String=Runtime.Safe(Global.String);
  Scatter=Runtime.Safe(Sitelet.Scatter);
  Point=Runtime.Safe(Scatter.Point);
  Key=Runtime.Safe(Next.Key);
  Model1=Runtime.Safe(Next.Model1);
  Model=Runtime.Safe(Next.Model);
  Collections=Runtime.Safe(WebSharper.Collections);
  ResizeArray=Runtime.Safe(Collections.ResizeArray);
  ResizeArrayProxy=Runtime.Safe(ResizeArray.ResizeArrayProxy);
  PointModel=Runtime.Safe(Scatter.PointModel);
  setInterval=Runtime.Safe(Global.setInterval);
  Math=Runtime.Safe(Global.Math);
  Operators1=Runtime.Safe(WebSharper.Operators);
  jQuery=Runtime.Safe(Global.jQuery);
  return clearInterval=Runtime.Safe(Global.clearInterval);
 });
 Runtime.OnLoad(function()
 {
  Slider1.settingsVar();
  Slider1.fadeOutTrans();
  Slider1.fadeInTrans();
  Slider1.fade();
  Scatter.w();
  Scatter.range();
  Scatter.points();
  Scatter.padding();
  Scatter.h();
  Phoneword.phoneVar();
  Phoneword.label();
  Phoneword.inputField();
  Hello.nameVar();
  Hello.label();
  Hello.inputField();
  GoogleDashboard.gender();
  GoogleDashboard.data();
  GoogleDashboard.age();
  Bar.w();
  Bar.simpleTrans();
  Bar.h();
  Bar.dataset();
  Bar.data();
  return;
 });
}());
