import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    movie:{
        padding:'10px'
    },
    link:{
        alignItems: 'center',
        fontWeight: 'bolder',
        textDecoration: 'none',
        [theme.breakpoints.up('xs')]: {
            display: 'flex',
            flexDirection: 'column'
        },
        '&:hover':{
            cursor: 'pointer',
        }
    },
    title:{
        color: theme.palette.text.primary,
        textOverflow: 'ellipsis', // To truncate the text data
        width: '180px',
        overflow: 'hidden',
        marginTop: '10px',
        marginBottom : 0,
        textAlign: 'center',
        whiteSpace: 'nowrap'
    },
    image:{
        borderRadius: '20px',
        height: '300px',
        marginBottom: '10px',
        '&:hover':{
            transform: 'scale(1.05)'
        }
    },
}));
