import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { cats } from "../../constants";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

export default function Category({ getCategories, blogCats }) {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    if (blogCats) {
      setCategories(blogCats);
    }
  }, [blogCats]);

  React.useEffect(() => {
    getCategories(categories);
  }, [categories]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={categories}
          onChange={handleChange}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {cats.map((categoryName) => (
            <MenuItem key={categoryName} value={categoryName}>
              <Checkbox checked={categories.indexOf(categoryName) > -1} />
              <ListItemText primary={categoryName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
