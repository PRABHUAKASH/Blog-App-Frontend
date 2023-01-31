import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// const Blog = (title, description, imageURL, userName) => {
const Blog = (props) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${props.id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(
        `https://blog-backend-6a2f.onrender.com/api/blog/delete/${props.id}`
      )
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate('/'))
      .then(() => navigate('/blogs'));
  };
  return (
    <div>
      <Card
        sx={{
          width: '40%',
          margin: 'auto',
          mt: 2,
          padding: 2,
          boxShadow: '5px 5px 10px #ccc',
          ':hover:': {
            boxShadow: '10px 10px 20px #ccc',
          },
        }}
      >
        {props.isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
              <EditIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
              {props.userName}
            </Avatar>
          }
          title={props.title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={props.imageURL}
          alt="Paella dish"
        />

        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{props.userName}</b> {': '}
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
