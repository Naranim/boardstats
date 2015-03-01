var React = require('react');
var LineChart = require("react-chartjs").Line;

var Boardscore = React.createClass({
	render: function() {
		return (
			<div className="Boardscore">
				<TopMenu />
				<div className="MiddleDiv">
					<Resources {...this.props} />
					<Scoreboard players={this.props.players} />
				</div>
			</div>
		);
	}
});

var TopMenu = React.createClass({
	render: function() {
		return (
			<div className="TopMenu">
				menu...
			</div>
		);
	}
});

var Resources = React.createClass({
	render: function() {
		return (
			<div className="Resources">
				<Chart />
				<ResourcesList players={this.props.players} resources={this.props.resources} />
			</div>
		);
	}
});

var Scoreboard = React.createClass({
	render: function() {
		var players = this.props.players.slice();
		players.sort(function(a, b) { return b.score - a.score });
		var players = players.map(function(player, index) {
			return (
				<Player key={player.id} player={player} />
				)
		});
		players.sort(function(a, b) { return b.score - a.score });
		return (
			<div className="Scoreboard">
				{players}
			</div>
		);
	}
});

var Chart = React.createClass({
	render: function() {
		var chartData = {
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(255,51,0,0.2)",
		            strokeColor: "rgba(255,51,0,1)",
		            pointColor: "rgba(255,51,0,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [65, 59, 80, 81, 56, 55, 40]
		        },
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(0,102,255,0.2)",
		            strokeColor: "rgba(0,102,255,1)",
		            pointColor: "rgba(0,102,255,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [28, 48, 40, 19, 86, 27, 90]
		        },
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(51,204,51,0.2)",
		            strokeColor: "rgba(51,204,51,1)",
		            pointColor: "rgba(51,204,51,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [43, 12, 62, 55, 33, 27, 44]
		        }
		    ]
		};

		var chartOptions = {

		    ///Boolean - Whether grid lines are shown across the chart
		    scaleShowGridLines : true,

		    //String - Colour of the grid lines
		    scaleGridLineColor : "rgba(0,0,0,.05)",

		    //Number - Width of the grid lines
		    scaleGridLineWidth : 1,

		    //Boolean - Whether to show horizontal lines (except X axis)
		    scaleShowHorizontalLines: true,

		    //Boolean - Whether to show vertical lines (except Y axis)
		    scaleShowVerticalLines: true,

		    //Boolean - Whether the line is curved between points
		    bezierCurve : true,

		    //Number - Tension of the bezier curve between points
		    bezierCurveTension : 0.4,

		    //Boolean - Whether to show a dot for each point
		    pointDot : true,

		    //Number - Radius of each point dot in pixels
		    pointDotRadius : 4,

		    //Number - Pixel width of point dot stroke
		    pointDotStrokeWidth : 1,

		    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		    pointHitDetectionRadius : 20,

		    //Boolean - Whether to show a stroke for datasets
		    datasetStroke : true,

		    //Number - Pixel width of dataset stroke
		    datasetStrokeWidth : 2,

		    //Boolean - Whether to fill the dataset with a colour
		    datasetFill : true,

		    //String - A legend template
		    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

		};

		return (
			<div className="Chart"><LineChart data={chartData} options={chartOptions} width="720" height="250"/></div>
		);
	}
});

var ResourcesList = React.createClass({
	render: function() {
		var resources = this.props.resources;
		var playerResources = this.props.players.map(function(player, index) {
			return(
				<div className="ResourcesListElement">
					<Player player={player} />
					<PlayerResources player={player} resources={resources} />
				</div>	
				);
		})
		return (
			<div className="ResourcesList">
				{playerResources}
			</div>
		);
	}
});

var Player = React.createClass({
	render: function() {
		return (
			<div className="Player" style={{border: "1px solid " + this.props.player.color}}>
				<table className="PlayerTable">
					<tr className="PlayerTr">
						<td className="PlayerTd"> {this.props.player.name} </td>
						<td className="PlayerTd"> {this.props.player.score} </td>
					</tr>
				</table>
			</div>
		);
	}
});

var PlayerResources = React.createClass({
	render: function() {
		var player = this.props.player;
		var resources = this.props.resources;
		var resourcesEntries = this.props.resources.map(function(resourcesKind, index) {
			return(
				<ResourcesEntry player={player} resourcesKind={resourcesKind} />
				);
		});
		return (
			<div className="PlayerResources">
				{resourcesEntries}
			</div>
		);
	}
});

var ResourcesEntry = React.createClass({
	render: function() {
		var resourcesKind = this.props.resourcesKind;
		var player = this.props.player;
		var resourcesKindName = this.props.resourcesKind.name;
		var currentResources = this.props.resourcesKind.assets.map(function(resource, index) {
			return(
				<Resource player={player} name={resource} resourcesKindName={resourcesKindName} />
				);
		});
		return (
			<div className="ResourcesEntry">
				<p>{resourcesKind}</p>
				<div className="ResourcesEntry_Inside">
					{currentResources}
				</div>
			</div>
		);
	}
});

var Resource = React.createClass({
	render: function() {
		return (
			<div className="Resource">
				{this.props.name}: {this.props.player.resources[this.props.resourcesKindName][this.props.name]}
			</div>
		);
	}
});

var Icon = React.createClass({
	render: function() {
		return (
			<div className="Icon" style={{backgroundColor: this.props.player.color}}></div>
		);
	}
});

var resources = [
	{
		name: "cuttle",
		assets: ["sheep", "boar"]
	},
	{
		name: "stock",
		assets: ["weed", "clay", "stone", "grain"]
	}
]

var players = [
	{
		name: "Ciemny",
		color: "#0066FF",
		score: 0,
		resources: {
			cuttle: {
				sheep: 0,
				boar: 5
			},
			stock: {
				weed: 5,
				clay: 1,
				stone: 3,
				grain: 8
			}
		}
	},
	{
		name: "Kondziu",
		color: "#FF3300",
		score: 5,
		resources: {
			cuttle: {
				sheep: 1,
				boar: 0
			},
			stock: {
				weed: 7,
				clay: 9,
				stone: 2,
				grain: 2
			}
		}
	},
	{
		name: "Paweł",
		color: "#33CC33",
		score: 3,
		resources: {
			cuttle: {
				sheep: 2,
				boar: 3
			},
			stock: {
				weed: 1,
				clay: 0,
				stone: 0,
				grain: 18
			}
		}
	},
];

React.render(<Boardscore players={players} resources={resources} />, document.body);