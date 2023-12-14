import { Button, Typography, Box } from "@mui/material";
import { Image_BASE_URL } from "../../APiSetUp/axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FileUpload = ({ handleFileChange, selectedFile }) => {
    const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];
    return (
        <Box p={1} border="1px dashed #ccc" borderRadius={2} textAlign="center" display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}  >
                Upload Image
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            {selectedFile && (
                <Box width={'50%'} display={'flex'} alignItems={'center'} gap={2} textAlign='end' justifyContent={'flex-end'}>
                    <Typography variant="body2">
                        {selectedFile?.split("/")[2]}
                    </Typography>
                    <img src={`${Image_BASE_URL}${selectedFile}`} alt="Selected" style={{ height: '50px', width: '50px' }} />
                </Box>
            )}
        </Box>
    )
}

export default FileUpload