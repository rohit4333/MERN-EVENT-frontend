import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

import { categories } from "../../constants/data";

const EventButton = styled(Button)`
  margin: 20px;
  width: 85%;
`;

const StyledTable = styled(Table)`
  border: 1px solid rgba(244, 244, 244, 1);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Categeries = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  return (
    <div>
      <StyledLink
        to={`/create?category=${category || ""}`}
        style={{ textDecoration: "none" }}
      >
        <EventButton variant="contained">Create Event</EventButton>
      </StyledLink>

      <StyledTable>
        <TableHead>
          <TableCell style={{ textAlign: "center" }}>
            <StyledLink to="/">All Categories</StyledLink>
          </TableCell>
        </TableHead>
        <TableBody>
          {categories.map((item) => (
            <TableRow key={item.id}>
              <TableCell style={{ textAlign: "center" }}>
                <StyledLink to={`/?category=${item.type}`}>
                  {item.type}
                </StyledLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </div>
  );
};

export default Categeries;
