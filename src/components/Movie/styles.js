import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    movie:{
        padding:'10px'
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
    }
}));
