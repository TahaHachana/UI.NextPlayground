declare module Sitelet {
    module Skin {
        interface Page {
            Title: string;
            Body: __ABBREV.__List.T<any>;
        }
    }
    module Controls {
        interface EntryPoint {
            get_Body(): __ABBREV.__Html.IPagelet;
        }
    }
    module Client {
        var main : {
            (): __ABBREV.__Html.Element;
        };
    }
    module Slider {
        interface Direction {
        }
        interface Settings {
            Imgs: any;
            Hover: boolean;
            Direction: __ABBREV.__Slider.Direction;
        }
        var render : {
            (settings: any): __ABBREV.__Next.Doc;
        };
        var main : {
            (): void;
        };
        var fade : {
            (): {
                (x: number): {
                    (x: number): any;
                };
            };
        };
        var fadeInTrans : {
            (): any;
        };
        var fadeOutTrans : {
            (): any;
        };
        var settingsVar : {
            (): __ABBREV.__Next.Var1<any>;
        };
    }
    module GoogleDashboard {
        module Gender {
            var Show : {
                (gender: __ABBREV.__GoogleDashboard.Gender): string;
            };
        }
        interface Gender {
        }
        interface Person {
            Name: string;
            Gender: __ABBREV.__GoogleDashboard.Gender;
            Age: number;
            DonutsEaten: number;
        }
        interface Filter {
            Gender: __ABBREV.__GoogleDashboard.Gender;
        }
        var render : {
            (data: __ABBREV.__List.T<any>): __ABBREV.__Next.Doc;
        };
        var main : {
            (): void;
        };
        var data : {
            (): __ABBREV.__List.T<any>;
        };
        var age : {
            (): __ABBREV.__Next.Var1<any>;
        };
        var gender : {
            (): __ABBREV.__Next.Var1<__ABBREV.__GoogleDashboard.Gender>;
        };
    }
    module Bar {
        module Order {
            var Show : {
                (order: __ABBREV.__Bar.Order): string;
            };
        }
        interface Datum {
            X: number;
            Index: number;
            OldIndex: number;
        }
        interface Order {
        }
        var simpleAnim : {
            (x: number, y: number): any;
        };
        var render : {
            (xScale: __ABBREV.__D3.OrdinalScale<number>, yScale: __ABBREV.__D3.QuantitativeScale, datum: any): __ABBREV.__Next.Doc;
        };
        var main : {
            (): void;
        };
        var dataset : {
            (): number[];
        };
        var data : {
            (): any[];
        };
        var w : {
            (): number;
        };
        var h : {
            (): number;
        };
        var simpleTrans : {
            (): any;
        };
    }
    module Phoneword {
        var _Contains___ : {
            (str: string, x: string): __ABBREV.__WebSharper.OptionProxy<string>;
        };
        var translate : {
            (x: string): __ABBREV.__WebSharper.OptionProxy<number>;
        };
        var toNumber : {
            (raw: string): string;
        };
        var main : {
            (): __ABBREV.__Next.Doc;
        };
        var phoneVar : {
            (): __ABBREV.__Next.Var1<string>;
        };
        var inputField : {
            (): __ABBREV.__Next.Doc;
        };
        var label : {
            (): __ABBREV.__Next.Doc;
        };
    }
    module Scatter {
        module Point {
            var Create : {
                (x: number, y: number): __ABBREV.__Scatter.Point;
            };
        }
        interface Point {
            X: number;
            Y: number;
            Key: __ABBREV.__Next.Key;
        }
        interface PointModel {
            Add(point: __ABBREV.__Scatter.Point): void;
            get_MaxX(): number;
            get_MaxY(): number;
            get_View(): __ABBREV.__Next.View1<__ABBREV.__WebSharper.seq<__ABBREV.__Scatter.Point>>;
        }
        var scale : {
            (xScale: __ABBREV.__D3.QuantitativeScale, yScale: __ABBREV.__D3.QuantitativeScale, rScale: __ABBREV.__D3.QuantitativeScale, point: __ABBREV.__Scatter.Point): any;
        };
        var render : {
            <_M1>(scale: {
                (x: _M1): any;
            }, point: _M1): __ABBREV.__Next.Doc;
        };
        var main : {
            (): void;
        };
        var range : {
            (): number;
        };
        var points : {
            (): __ABBREV.__List.T<__ABBREV.__Scatter.Point>;
        };
        var w : {
            (): number;
        };
        var h : {
            (): number;
        };
        var padding : {
            (): number;
        };
    }
    module Hello {
        var main : {
            (): __ABBREV.__Next.Doc;
        };
        var nameVar : {
            (): __ABBREV.__Next.Var1<string>;
        };
        var inputField : {
            (): __ABBREV.__Next.Doc;
        };
        var label : {
            (): __ABBREV.__Next.Doc;
        };
    }
    interface Action {
    }
    interface Website {
    }
}
declare module __ABBREV {
    
    export import __List = IntelliFactory.WebSharper.List;
    export import __Html = IntelliFactory.WebSharper.Html;
    export import __Slider = Sitelet.Slider;
    export import __Next = IntelliFactory.WebSharper.UI.Next;
    export import __GoogleDashboard = Sitelet.GoogleDashboard;
    export import __Bar = Sitelet.Bar;
    export import __D3 = IntelliFactory.WebSharper.D3;
    export import __WebSharper = IntelliFactory.WebSharper;
    export import __Scatter = Sitelet.Scatter;
}
