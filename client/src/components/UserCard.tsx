import { Card, CardContent, Typography } from '@mui/material';


interface UserCardProps {
    name: string,
    email: string,
    score: number
}

const UserCard:React.FC<UserCardProps> = (props) => {
  return (
    <Card
      sx={{
        backgroundColor: "#55a7ff",
        maxWidth: 300,
        margin: 'auto',
        borderRadius: 5,
        boxShadow: 3,
        textAlign: 'center',
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {props.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {props.email}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Score: {props.score}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard;