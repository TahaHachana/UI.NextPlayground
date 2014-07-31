namespace UINext

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.UI.Next
open IntelliFactory.WebSharper.UI.Next.Html
open IntelliFactory.WebSharper.EcmaScript
open IntelliFactory.WebSharper.D3

[<JavaScript>]
module Hello =

    let nameVar = Var.Create ""
    let inputField = Doc.Input [] nameVar

    let label =
        nameVar.View
        |> View.Map (fun x -> "Hello " + x + "!")
        |> Doc.TextView

    let main() =
      
        Div0 [
            Label0 [Doc.TextNode "Name:"]
            Div0 [inputField]
            H20 [label]
        ]

[<JavaScript>]
module Scatter =

    type Point =
        {
            X : int
            Y : int
            Key : Key
        }

        static member Create x y =
            { X = x; Y = y; Key = Key.Fresh ()}

    type PointModel(points) =
        let arr = ResizeArray<Point>()
        do arr.AddRange points
        let model = arr |> Model.Create (fun x ->  x.ToArray() |> Seq.ofArray)

        member __.Add point =
            arr.Add point
            Model.Update(fun _ -> ()) model

        member __.MaxX =
            arr
            |> Seq.maxBy (fun x -> x.X)
            |> fun x -> float x.X

        member __.MaxY =
            arr
            |> Seq.maxBy (fun x -> x.Y)
            |> fun x -> float x.Y

        member __.View = Model.View model

    let scale (xScale:QuantitativeScale) (yScale:QuantitativeScale) (rScale:QuantitativeScale) point =
        xScale.Apply (float point.X),
        yScale.Apply (float point.Y),
        rScale.Apply (float point.Y)
        
    let render scale point =
        let cx, cy, r = scale point
        SvgElements.Circle [
            Attr.Create "cx" (string cx)
            Attr.Create "cy" (string cy)
            Attr.Create "r" (string r)
        ] []

    let range = Math.Random() * 1000.

    let points =
        [0 .. 19]
        |> List.map (fun _ ->
            let x = Math.Floor(Math.Random() * range)
            let y = Math.Floor(Math.Random() * range)
            Point.Create x y
        )

    let w = 500.
    let h = 300.
    let padding = 30.

    let main() =
        let model = PointModel points

        let xScale =
            D3.Scale.Linear()
                .Domain([|0.; model.MaxX|])
                .Range([|padding; w - padding * 2.|])
        
        let yScale =
            D3.Scale.Linear()
                .Domain([|0.; model.MaxY|])
                .Range([|h - padding; padding|])

        let rScale =
            D3.Scale.Linear()
                .Domain([|0.; model.MaxY|])
                .Range([|2.; 5.|])

        let xAxis =
            D3.Svg.Axis()
                .Scale(xScale)
                .Orient(Orientation.Bottom)
                .Ticks(5)

        let yAxis =
            D3.Svg.Axis()
                .Scale(yScale)
                .Orient(Orientation.Left)
                .Ticks(5)

        let svg =
            D3.Select("#scatter")
                .Append("svg")
                .Attr("width", w)
                .Attr("height", h)
                
        svg.Append("g")
            .Attr("id", "scatter-svg")
            .Style("fill", "steelblue")
        |> ignore                
        
        svg.Append("g")
            .Attr("class", "axis")
            .Attr("transform", "translate(0," + string (h - padding) + ")")
            .Call(fun x -> xAxis.Apply x)
        |> ignore

        svg.Append("g")
            .Attr("class", "axis")
            .Attr("transform", "translate(" + string padding + ",0)")
            .Call(fun x -> yAxis.Apply x)
        |> ignore

        let scale' = scale xScale yScale rScale

        model.View
        |> Doc.ConvertBy (fun m -> m.Key) (render scale') 
        |> Doc.RunById "scatter-svg"
           
        let rndX() = Math.Floor(Math.Random() * model.MaxX)
        let rndY() = Math.Floor(Math.Random() * model.MaxY)

        JavaScript.SetInterval(fun () ->
            let x = rndX()
            let y = rndY()
            model.Add (Point.Create x y)

        ) 1000
        |> ignore
               
[<JavaScript>]
module Phoneword =

    let (|Contains|_|) (str:string) x =
        match str.Contains x with
        | false -> None
        | true -> Some x

    let translate x =
        match x with
        | Contains "ABC" x -> Some 2
        | Contains "DEF" x -> Some 3
        | Contains "GHI" x -> Some 4
        | Contains "JKL" x -> Some 5
        | Contains "MNO" x -> Some 6
        | Contains "PQRS" x -> Some 7
        | Contains "TUV" x -> Some 8
        | Contains "WXYZ" x -> Some 9
        | _ -> None

    let toNumber (raw:string) =
        raw.ToUpper()
        |> Seq.choose(fun x ->
            let xString = string x
            match " -0123456789".Contains xString with
            | false ->
                let result = translate xString
                match result with
                | None -> None
                | Some y -> Some <| string y
            | true -> Some xString)
        |> String.concat ""

    let phoneVar = Var.Create "1-645-COMPANY"
    let inputField = Doc.Input [] phoneVar

    let label =
        phoneVar.View
        |> View.Map toNumber
        |> Doc.TextView

    let main() =
      
        Div0 [
            Label0 [Doc.TextNode "Phoneword:"]
            Div0 [inputField]
            H20 [label]
        ]

[<JavaScript>]
module Bar =
    
    type Datum = {X : float; Index : int; OldIndex : int}

    let dataset =
        [|5.0; 10.0; 13.0; 19.0; 21.0; 25.0; 22.0; 18.0; 15.0; 13.0; 11.0; 12.0;
            15.0; 20.0; 18.0; 17.0; 16.0; 18.0; 23.0; 25.0|]
        
    let data =
        dataset
        |> Array.mapi (fun idx x -> {X = x; Index = idx; OldIndex = idx})

    let w = 600.
    let h = 250.
     
    let simpleAnim x y =
        Anim.Simple Interpolation.Double Easing.CubicInOut
            400.
            x y

    let simpleTrans =
        Trans.Create simpleAnim
        
    let render (xScale:OrdinalScale<int>) (yScale:QuantitativeScale) (datum:Datum) =
        let index = datum.Index
        let oldIndex = xScale.Apply datum.OldIndex
        let x = float datum.X
        let trans =
            simpleTrans
            |> Trans.Enter (fun x -> simpleAnim oldIndex x)
        Doc.Concat [
            SvgElements.Rect [
                Attr.Create "y" (string <| h - yScale.Apply(x))
                Attr.Create "width" (string <| xScale.RangeBand())
                Attr.Create "height" (string <| yScale.Apply(x))
                Attr.Create "fill" "steelblue"
                Attr.Animated "x" trans (View.Map id <| View.Const(xScale.Apply(index))) string
            ] []
            SvgElements.Text [
                Attr.Create "text-anchor" "middle"
                Attr.Create "font-family" "sans-serif"
                Attr.Create "font-size" "11px"
                Attr.Create "fill" "white"
                Attr.Animated "x" trans (View.Map id <| View.Const(xScale.Apply(index) + 7.)) string
                Attr.Create "y" (string <| h - yScale.Apply(x) + 15.)
            ] [Doc.TextNode (string x)]
        ]

    type Order = None | Desc | Asc

    type Order with

        static member Show order =
            match order with
            | None -> "None"
            | Asc -> "Asc"
            | Desc -> "Desc"

    let main () =

        let xScale =
            D3.Scale.Ordinal()
                .Domain(D3.Range(dataset.Length))
                .RangeRoundBands((0., w), 0.5)

        let yScale =
            D3.Scale.Linear()
                .Domain([|0.; D3.Max(dataset)|])
                .Range([|0.; h|])

        let svg =
            D3.Select("#bar-chart")
                .Append("svg")
                .Attr("width", w)
                .Attr("height", h)
                
        svg.Append("g")
            .Attr("id", "bar-svg")
        |> ignore                        

        let oldOrder = Var.Create None
        let order = Var.Create None
        
        let bars = View.Map (fun order ->
            match order with
            | None ->
                let order' = Var.Get oldOrder
                Var.Set oldOrder None
                match order' with
                | None -> data
                | Asc ->
                    data
                    |> Array.sortBy (fun y -> y.X)
                    |> Array.mapi (fun idx d -> {data.[idx] with OldIndex = d.Index})
                | Desc ->
                    data
                    |> Array.sortBy (fun y -> y.X)
                    |> Array.rev
                    |> Array.mapi (fun idx d -> {data.[idx] with OldIndex = d.Index})       
            | Asc ->
                Var.Set oldOrder Asc
                data
                |> Array.sortBy (fun y -> y.X)
                |> Array.mapi (fun idx d -> {d with Index = idx; OldIndex = d.Index})
            | Desc ->
                Var.Set oldOrder Desc
                data
                |> Array.sortBy (fun y -> y.X)
                |> Array.rev
                |> Array.mapi (fun idx d -> {d with Index = idx; OldIndex = d.Index})) order.View
        
        let showDatums datums =
            Doc.Concat (Array.map (fun y -> render xScale yScale y) datums)

        View.Map showDatums bars
        |> Doc.EmbedView
        |> Doc.RunById "bar-svg"
        
        Div [Attr.Style "margin-bottom" "10px"] [
            Doc.TextNode "Order: "
            Doc.Select [] Order.Show [None; Asc; Desc] order
        ]
        |> Doc.RunById "bar"

[<JavaScript>]
module GoogleDashboard =

    open IntelliFactory.WebSharper.Google.Visualization
    open IntelliFactory.WebSharper.Google.Visualization.Base
    open IntelliFactory.WebSharper.JQuery

    type Gender =
        | Female
        | Male
        | None

        static member Show gender =
            match gender with
            | Female -> "Female"
            | Male -> "Male"
            | None -> "None"

    type Person =
        {
            Name : string
            Gender : Gender
            Age : int
            DonutsEaten : int
        }

    type Filter =
        {
            Gender : Gender
        }

    let data =
        [
            {Name = "Michael"; Gender = Male; Age = 24; DonutsEaten = 5}
            {Name = "Elisa"; Gender = Female; Age = 31; DonutsEaten = 4}
            {Name = "John"; Gender = Male; Age = 40; DonutsEaten = 1}
            {Name = "Jessica"; Gender = Female; Age = 37; DonutsEaten = 3}
            {Name = "Margareth"; Gender = Female; Age = 53; DonutsEaten = 2}
            {Name = "Miranda"; Gender = Female; Age = 25; DonutsEaten = 3}
            {Name = "Jack"; Gender = Male; Age = 26; DonutsEaten = 2}
        ]

    let render (data:Person list) =
        let dataTable = DataTable()
        dataTable.addColumn(ColumnType.StringType, "Name") |> ignore
        dataTable.addColumn(ColumnType.NumberType, "Donuts Eaten") |> ignore
        dataTable.addRows data.Length |> ignore
        data
        |> List.iteri (fun idx person ->
            dataTable.setCell(idx, 0, person.Name)
            dataTable.setCell(idx, 1, person.DonutsEaten))

        let e = IntelliFactory.WebSharper.Html.Operators.ById "google-pie"
        let pie = PieChart(e)
        let options = PieChartOptions()
        pie.draw(dataTable, options)

        let dataTable' = DataTable()
        dataTable'.addColumn(ColumnType.StringType, "Name") |> ignore
        dataTable'.addColumn(ColumnType.StringType, "Gender") |> ignore
        dataTable'.addColumn(ColumnType.NumberType, "Age") |> ignore
        dataTable'.addColumn(ColumnType.NumberType, "Donuts Eaten") |> ignore
        dataTable'.addRows data.Length |> ignore
        data
        |> List.iteri (fun idx person ->
            dataTable'.setCell(idx, 0, person.Name)
            dataTable'.setCell(idx, 1, match person.Gender with | Female -> "Female" | _ -> "Male")
            dataTable'.setCell(idx, 2, person.Age)
            dataTable'.setCell(idx, 3, person.DonutsEaten))

        let e' = IntelliFactory.WebSharper.Html.Operators.ById "google-table"
        let table = Table(e')
        let options = TableOptions()
        table.draw(dataTable', options)

        Doc.Empty

    let age = Var.Create (20, 60)
    let gender = Var.Create None

    let main() =

        let persons =
            View.Map2 (fun g age ->
                match g with
                | None -> data
                | _ -> data |> List.filter (fun x -> x.Gender = g)
                |> List.filter (fun x -> x.Age < (snd age) && x.Age > (fst age))
                ) gender.View age.View
        
        View.Map render persons
        |> Doc.EmbedView
        |> Doc.RunById "google"

        age.View
        |> View.Map (fun (min, max) -> "Min: " + string min + " Max: " + string max)
        |> Doc.TextView
        |> Doc.RunById "min-max"
        
        Div [] [
            Doc.TextNode "Gender Selection: "
            Doc.Select [] Gender.Show [None; Female; Male] gender
        ]
        |> Doc.RunById "google-dash"


[<JavaScript>]
module Client =
    
    open IntelliFactory.WebSharper.Html
    open IntelliFactory.WebSharper.D3

    
    let main() =      
        let config = JQueryUI.SliderConfiguration()
        config.Max <- 60
        config.Min <- 20
        config.Values <- [|25; 55|]
        config.Range <- true
        let slider = JQueryUI.Slider.New config
        slider.OnSlide(fun _ ->
            let values = slider.Values
            Var.Set GoogleDashboard.age (values.[0], values.[1]))
        Div [Attr.Class "container"] -< [
            Div [Attr.Class "example"] -< [
                H1 [Text "Hello"; Attr.Class "page-header"]
                Div [Attr.Id "hello"]
            ]
            Hr []
            Div [Attr.Class "example"] -< [
                H1 [Text "Dynamic Scatterplot"; Attr.Class "page-header"]
                Div [Attr.Id "scatter"]
            ]
            Hr []
            Div [Attr.Class "example"] -< [
                H1 [Text "Phoneword"; Attr.Class "page-header"]
                Div [Attr.Id "phoneword"]
            ]
            Hr []
            Div [Attr.Class "example"] -< [
                H1 [Text "Bar"; Attr.Class "page-header"]
                Div [Attr.Id "bar"]
                Div [Attr.Id "bar-chart"]
            ]
            Hr []
            Div [Attr.Class "example"] -< [
                H1 [Text "Google Dashboard"; Attr.Class "page-header"]
                Div [Attr.Class "row"; Attr.Style "margin-bottom:50px;"] -< [
                    Div [Attr.Class "col-md-6"] -< [
                        Div [Attr.Id "min-max"]
                        Div [slider]
                    ]        
                    Div [Attr.Class "col-md-6"] -< [
                        Div [Attr.Id "google-dash"]
                    ]
                ]
                Div [Attr.Class "row"] -< [
                    Div [Attr.Class "col-md-6"] -< [
                        Div [Attr.Style "height: 400px;"; Attr.Id "google-pie"]

                    ]        
                    Div [Attr.Class "col-md-6"] -< [
                        Div [Attr.Style "height: 400px;"; Attr.Id "google-table"]
                    ]
                ]
                Div [Attr.Id "google"]
            ]
        ]
        |>! OnAfterRender(fun _ ->
            Doc.RunById "hello" <| Hello.main()
            Scatter.main()
            Doc.RunById "phoneword" <| Phoneword.main()
            Bar.main()
            GoogleDashboard.main()
        )