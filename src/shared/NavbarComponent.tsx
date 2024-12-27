import React, { useState } from "react";
import { Navbar, Container, Form, Row, Col } from "react-bootstrap";
import nasdaq from "../assets/nasdaq.jpg";

// Navbar Component with Search
interface NavbarComponentProps {
  onSearch: (query: string) => void;
}

function NavbarComponent({ onSearch }: NavbarComponentProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the search query back to the parent (NasdakShares)
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container style={{ justifyContent: "start" }}>
        <Navbar.Brand href="#home">
          <img src={nasdaq} style={{ width: "120px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Form style={{ paddingLeft: "33%" }}>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="mr-sm-2"
              />
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
