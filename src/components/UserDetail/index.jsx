import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; 

function UserDetail() {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    setLoading(true);
    fetchModel(`/user/${userId}`).then((data) => {
      if (data) {
        setUser(data);
        setError(null);
      } else {
        setError("User not found or failed to fetch.");
      }
      setLoading(false);
    });
  }, [userId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1">
        <b>Location:</b> {user.location}
      </Typography>
      <Typography variant="body1">
        <b>Occupation:</b> {user.occupation}
      </Typography>
      <Typography variant="body1">
        <b>Description:</b> {user.description}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        <Link to={`/photos/${userId}`}>View Photos of {user.first_name}</Link>
      </Typography>
    </>
  );
}

export default UserDetail;