 var contacts = [
	{
		id: 1,
		name: 'Karry Perry',
		number: '+79612220055'
	}, 
	{
		id: 2,
		name: 'Autist',
		number: '+79617771232'
	},
	{
		id: 3,
		name: 'Kek',
		number: '+79611336113'
	},
	{
		id: 4,
		name: 'Peka',
		number: '+79614444485'
	}
];

var Contact = React.createClass({
	render: function() {
		return (
			<li className="contact">
				<div className="contact-name"> {this.props.name} </div>
				<div className="contact-phone"> {this.props.phone} </div>
			</li> 
		);
	}
});

var ContactList = React.createClass({
	getInitialState: function () {
		return {
			displayedContacts: contacts
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

	render: function() {
		return (
			<div className="contacts">
				<input type="text" className="contacts-search_field" onChange={this.handleSearch} />
				<ul className="contacts-list">
					{
						this.state.displayedContacts.map(function (element) {
							return <Contact 
								key={element.id} 
								name={element.name} 
								phone={element.number}
							/>;
						})
					}
				</ul>
			</div>
		)
	}
});

ReactDOM.render(
	<ContactList />,
	document.getElementById("content")
);