function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /*
  Inspired by: "Framer Android Picker"
  By: John Sherwin
  Link: https://dribbble.com/shots/4467822-Framer-Android-Picker
*/
const { Component, Fragment } = React;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const YEARS = new Array(201).
fill(1900).
map((value, index) => value + index);

class CustomWheel extends Component {

  constructor({ selected }) {
    super();_defineProperty(this, "onMouseDown",













    event => {
      this.previousY = event.touches ? event.touches[0].clientY : event.clientY;
      this.dragging = true;

      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('touchmove', this.onMouseMove);
      document.addEventListener('touchend', this.onMouseUp);
    });_defineProperty(this, "onMouseMove",

    event => {
      let clientY = event.touches ? event.touches[0].clientY : event.clientY;

      this.offset = clientY - this.previousY;

      let maxPosition = -this.props.data.length * 50;
      let position = this.state.position + this.offset;

      this.setState({ position: Math.max(maxPosition, Math.min(50, position)) });

      this.previousY = event.touches ? event.touches[0].clientY : event.clientY;
    });_defineProperty(this, "onMouseUp",

    () => {
      // calculate closeset snap
      let maxPosition = -(this.props.data.length - 1) * 50;
      let rounderPosition = Math.round((this.state.position + this.offset * 5) / 50) * 50;
      let finalPosition = Math.max(maxPosition, Math.min(0, rounderPosition));

      this.dragging = false;
      this.setState({ position: finalPosition });

      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('touchmove', this.onMouseMove);
      document.removeEventListener('touchend', this.onMouseUp);

      this.props.onDateChange(this.props.type, -finalPosition / 50);
    });this.state = { position: selected ? -(selected - 1) * 50 : 0 };this.offset = 0;this.dragging = false;}componentDidUpdate() {let selectedPosition = -(this.props.selected - 1) * 50;if (!this.dragging && this.state.position !== selectedPosition) {this.setState({ position: selectedPosition });}}

  render() {
    let inlineStyle = {
      willChange: 'transform',
      transition: `transform ${Math.abs(this.offset) / 100 + 0.1}s`,
      transform: `translateY(${this.state.position}px)` };


    return /*#__PURE__*/(
      React.createElement("div", { className: "dragdealer year", onMouseDown: this.onMouseDown, onTouchStart: this.onMouseDown }, /*#__PURE__*/
      React.createElement("ul", { className: "handle", style: inlineStyle },
      this.props.data.map(year => /*#__PURE__*/React.createElement("li", { key: year }, year)))));



  }}


class DatePicker extends Component {constructor(...args) {super(...args);_defineProperty(this, "dateChanged",

    (type, changedData) => {
      let newDate;

      if (type === 'day') {

        newDate = new Date(this.props.date.getFullYear(), this.props.date.getMonth(), changedData + 1);

      } else if (type === 'month') {

        let maxDayInSelectedMonth = new Date(this.props.date.getFullYear(), changedData + 1, 0).getDate();
        let day = Math.min(this.props.date.getDate(), maxDayInSelectedMonth);

        newDate = new Date(this.props.date.getFullYear(), changedData, day);

      } else if (type === 'year') {

        let maxDayInSelectedMonth = new Date(1900 + changedData, this.props.date.getMonth() + 1, 0).getDate();
        let day = Math.min(this.props.date.getDate(), maxDayInSelectedMonth);

        newDate = new Date(1900 + changedData, this.props.date.getMonth(), day);

      }

      this.props.onDateChange(newDate);
    });}

  render() {
    this.days = new Array(new Date(this.props.date.getFullYear(), this.props.date.getMonth() + 1, 0).getDate()).
    fill(1).
    map((value, index) => value + index);

    this.months = MONTHS;
    this.years = YEARS;

    return /*#__PURE__*/(
      React.createElement("div", { className: "date-picker" }, /*#__PURE__*/
      React.createElement(CustomWheel, { type: "day", data: this.days, selected: this.props.date.getDate(), onDateChange: this.dateChanged }), /*#__PURE__*/
      React.createElement(CustomWheel, { type: "month", data: this.months, selected: this.props.date.getMonth() + 1, onDateChange: this.dateChanged }), /*#__PURE__*/
      React.createElement(CustomWheel, { type: "year", data: this.years, selected: this.props.date.getYear() + 1, onDateChange: this.dateChanged })));


  }}


class App extends Component {constructor(...args) {super(...args);_defineProperty(this, "state",

    { date: new Date() });_defineProperty(this, "resetDate",

    () => {
      this.setState({ date: new Date() });
    });_defineProperty(this, "dateChanged",

    newDate => {
      this.setState({ date: newDate });
    });}

  render() {
    return /*#__PURE__*/(
      React.createElement(Fragment, null, /*#__PURE__*/
      React.createElement("div", { className: "date" }, this.state.date.getDate(), " ", MONTHS[this.state.date.getMonth()], " ", this.state.date.getFullYear()), /*#__PURE__*/
      React.createElement(DatePicker, { date: this.state.date, onDateChange: this.dateChanged }), /*#__PURE__*/
      React.createElement("button", { className: "reset", onClick: this.resetDate }, "Reset Date")));


  }}



ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector('#app'));