import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { RiAddLine, RiCloseLine, RiSearch2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { API } from "../../../configAPI/api";
import Excel from "../importFile/Excel";
import moment from "moment";

const TableHeading = ({ item, index }) => <th key={index}>{item.heading}</th>;

const TableRow = ({ item, columns, index, colNo, colAct, setDataId }) => {
  return (
    <tr>
      {colNo && <td>{index + 1}</td>}
      {columns.map((colItem, idx) => {
        if (colItem.selector.includes(".")) {
          const itemSplit = colItem.selector.split(".");
          return (
            <td key={idx}>
              {colItem.format
                ? colItem.format(item[itemSplit[0]][itemSplit[1]])
                : item[itemSplit[0]][itemSplit[1]]}
            </td>
          );
        }

        return (
          <td key={idx}>
            {colItem.format
              ? colItem.format(item[`${colItem.selector}`])
              : item[`${colItem.selector}`]}
          </td>
        );
      })}
      {colAct && <td>{colAct(item, setDataId)}</td>}
    </tr>
  );
};

const MyTable = ({
  columns,
  url,
  colNo,
  colAct,
  pathAdd,
  expExcel,
  nameColExcel,
  dateRangePicker,
  report,
}) => {
  const ref = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [btnSearch, setBtnSearch] = useState(true);
  const [dataId, setDataId] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [total, setTotal] = useState(1);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  console.log(dateStart, dateEnd);

  const totalPage = Math.ceil(total / perPage);

  const getData = async () => {
    try {
      let response;
      if (!report) {
        response = await API.get(
          `${url}?page=${page}&perPage=${perPage}&search=${search}`
        );
      } else {
        response = await API.get(
          `${url}?page=${page}&perPage=${perPage}&search=${search}&start=${dateStart}&end=${dateEnd}`
        );
      }
      setData(response.data.data.data);
      setTotal(response.data.data.total);
      console.log(response);
      // setDateStart(response.data.data.data[0].tgl_registrasi)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    setPage(1);
    setSearch(searchValue);
    setBtnSearch(false);
  };

  const handleClear = () => {
    setSearchValue("");
    setSearch("");
    setBtnSearch(true);
  };

  const convertHeading = (data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(data[i]?.heading);
    }
    console.log(result);
    return result;
  };

  const convertColumns = (data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(Object.values(data[i]));
    }
    console.log(result);
    return result;
  };

  const dataSet = [
    {
      columns: convertHeading(columns),
      data: convertColumns(data),
    },
  ];

  useEffect(() => {
    if (dateStart === "" || dateEnd === "") {
      setDateStart(moment().subtract(1, "months").format("MM-DD-YYYY "));
      setDateEnd(moment().format("MM-DD-YYYY"));
    }
    getData();
  }, [search, dataId, page, dateStart, dateEnd]);

  return (
    <div>
      {expExcel && (
        <Excel
          dataSet={dataSet}
          element={<button>Download Data</button>}
          name={nameColExcel}
        />
      )}

      <Row className="d-flex align-items-end mt-5 mb-3">
        {dateRangePicker && (
          <>
            <Col>
              <div className="d-flex  gap-3">
                <Form.Group
                  // className="0"
                  style={{ width: 200 }}
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    // ref={ref}
                    // onFocus={() => (ref.current.type = "date")}
                    // onBlur={() => (ref.current.type = "date")}
                    placeholder="Start Date"
                    name="tanggal_lahir"
                    onChange={(e) => setDateStart(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  // className="w-50"
                  style={{ width: 200 }}
                  controlId="exampleForm.ControlInput1"
                  required
                >
                  <Form.Label>End Date</Form.Label>

                  <Form.Control
                    type="date"
                    placeholder="End Date"
                    name="tanggal_lahir"
                    onChange={(e) => setDateEnd(e.target.value)}
                  />
                </Form.Group>
              </div>
            </Col>
          </>
        )}
        <Col xs={dateRangePicker ? 5 : 12}>
          <div className="d-flex justify-content-end  gap-3">
            <InputGroup style={{ width: "300px" }}>
              <Form.Control
                type="text"
                placeholder="Cari Nama"
                aria-describedby="search"
                value={searchValue}
                style={{ height: 40 }}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {btnSearch ? (
                <Button
                  style={{ height: 40 }}
                  variant="primary"
                  id="search"
                  onClick={handleSearch}
                >
                  <RiSearch2Line />
                </Button>
              ) : (
                <Button
                  style={{ height: 40 }}
                  variant="danger"
                  id="search"
                  onClick={handleClear}
                >
                  <RiCloseLine />
                </Button>
              )}
            </InputGroup>
            {pathAdd && (
              <Button
                style={{ height: 40 }}
                variant="primary"
                id="search"
                onClick={() => navigate(pathAdd)}
              >
                <RiAddLine /> Tambah
              </Button>
            )}
          </div>
        </Col>
      </Row>

      <div className="table">
        <Table striped bordered hover>
          <thead style={{ backgroundColor: "#999" }}>
            <tr>
              {colNo && <th>No.</th>}
              {columns.map((item, index) => (
                <TableHeading key={index} item={item} index={index} />
              ))}
              {colAct && <th>action</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <TableRow
                colNo={colNo}
                colAct={colAct}
                key={index}
                item={item}
                columns={columns}
                index={index}
                setDataId={setDataId}
              />
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-end align-items-center">
        <Pagination>
          <Pagination.First disabled={page <= 1} onClick={() => setPage(1)} />
          <Pagination.Prev
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          />
          <div className="d-flex justify-content-center align-items-center px-3">
            {page}/{totalPage}
          </div>
          <Pagination.Next
            disabled={page >= totalPage}
            onClick={() => setPage((current) => current + 1)}
          />
          <Pagination.Last
            disabled={page >= totalPage}
            onClick={() => setPage(totalPage)}
          />
        </Pagination>
      </div>
    </div>
  );
};

MyTable.prototype = {
  columns: PropTypes.array,
  data: PropTypes.array,
  colNo: PropTypes.bool,
  colAct: PropTypes.func,
  expExcel: PropTypes.bool,
};

MyTable.defaultProps = {
  colNo: true,
  expExcel: false,
};

export default MyTable;
