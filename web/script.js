var itemsList = [];

var CItemsList = React.createClass({
	getInitialState: function () {
		return {
			itemsList: itemsList
		}
	},

	handleSearch: function(event) {
		var searchQuery = event.target.value.toLowerCase();
		var displayedContacts = contacts.filter(function (el) {
			var searchValue = el.name.toLowerCase();
			return searchValue.indexOf(searchQuery) !== -1;
		});

		this.setState({
			displayedContacts: displayedContacts
		});
	},

	loadListFromBckend: function () {
		var xhttp = new XMLHttpRequest();
		var that = this;
		xhttp.open("get", "http://localhost:5000/api/todo/", true);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				that.setState({
					itemsList: JSON.parse(this.responseText)
				});
			}
		};
	},

	render: function() {
		return (
			<div className="contacts">
				<input type="text" className="contacts-search_field" onChange={this.loadListFromBckend} />
				<ul className="contacts-list">
					{
						this.state.itemsList.map(function (element) {
							console.log(element.name);
						})
					}
				</ul>
			</div>
		)
	}
});

ReactDOM.render(
	<CItemsList />,
	document.getElementById("content")
);