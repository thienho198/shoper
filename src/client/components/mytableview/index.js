import React from "react";
import "./mytableview.scss";
import _ from "lodash";
import CheckBox from "../checkbox";
import Spin from "../spin";

class TableView extends React.Component {
  constructor(props) {
    super(props);
    const tranferColumns = (columnsDef) => {
      const updateColumnDef = [...columnsDef];
      if (this.props.isHaveCheckbox) {
        updateColumnDef.unshift({
          field: "isChecked",
          textAlign: "center",
          label: <CheckBox onChange={this.onToggleAllCheckBox} />,
          width: "50px",
          style: { paddingLeft: "20px" },
        });
      }
      return updateColumnDef;
    };

    this.state = {
      columnsDef: tranferColumns(props.columnsDef) || [],
      rowsData: props.rowsData || [],
      isHaveCheckbox: props.isHaveCheckbox,
      minHeight: props.minHeight || "300px",
    };
  }
  //#region life cycle
  componentDidMount() {
    this.props.linkRef && this.props.linkRef(this);
  }
  //#region refs
  setValues(rowsData) {
    this.setState({ rowsData });
  }
  onSpin() {
    this.spinRef.onSpin();
  }
  onUnSpin() {
    this.spinRef.onUnSpin();
  }
  //#region events
  onToggleAllCheckBox = (value) => {
    const updateRows = _.cloneDeep(this.state.rowsData);
    updateRows.forEach((row) => (row.isChecked = value));
    this.setState({ rowsData: updateRows });
  };
  onToggleSpecificCheckbox = (id) => {
    const updateRows = _.cloneDeep(this.state.rowsData);
    const updateRow = updateRows.find((row) => row.id === id);
    updateRow && (updateRow.isChecked = !updateRow.isChecked);

    this.setState({ rowsData: updateRows });
  };
  //#region render
  renderRows(data, index) {
    return (
      <div
        key={data.id}
        style={{ display: this.props.isAutoWidth ? "flex" : "inline-flex" }}
        className="mytableview__content__row"
      >
        {this.state.columnsDef.map((col, inde) => {
          return (
            <div
              key={inde}
              className="mytableview__content__row__item"
              style={{
                flex:
                  col.width === "auto"
                    ? `1 1 ${col.minWidth}`
                    : `0 1 ${col.width}`,
                textAlign: col.textAlign,
                ...col.style,
                width: this.props.isAutoWidth
                  ? null
                  : col.width == "auto"
                  ? col.minWidth
                  : col.width,
              }}
            >
              {col.field === "stt" ? (
                <div style={{ paddingLeft: "3px" }}>{index + 1}</div>
              ) : col.renderer ? (
                col.renderer(data)
              ) : (
                data[col.field]
              )}
              {col.field === "isChecked" && (
                <CheckBox
                  isUseProps
                  isChecked={data.isChecked}
                  onClick={() => this.onToggleSpecificCheckbox(data.id)}
                />
              )}
            </div>
          );
        })}
        {this.props.actionBtns && this.props.actionBtns.length > 0 && (
          <div className="action__btns">
            {this.props.actionBtns.map((btn, index) => (
              <div
                key={index}
                className="action__btns__btn"
                onClick={() => btn.onClick(data)}
              >
                {btn.icon}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  renderHeader() {
    return this.state.columnsDef.map((item, index) => (
      <div
        key={index}
        className="mytableview__header__item"
        style={{
          textAlign: item.textAlign,
          flex:
            item.width === "auto"
              ? `1 1 ${item.minWidth}`
              : `0 1 ${item.width}`,
          ...item.style,
          width: this.props.isAutoWidth
            ? null
            : item.width == "auto"
            ? item.minWidth
            : item.width,
        }}
      >
        {item.label}
      </div>
    ));
  }

  render() {
    return (
      <div className="mytableview" style={{ minHeight: this.state.minHeight }}>
        <div
          className="mytableview__header"
          style={{ display: this.props.isAutoWidth ? "flex" : "inline-flex" }}
        >
          {this.renderHeader()}
        </div>
        <div className="mytableview__content">
          {this.state.rowsData.map((data, index) =>
            this.renderRows(data, index)
          )}
        </div>
        <Spin linkRef={(ref) => (this.spinRef = ref)} />
      </div>
    );
  }
}
TableView.defaultProps = {
  isHaveCheckbox: true,
  isAutoWidth: true,
};
export default TableView;
