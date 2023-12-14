import MUIRichTextEditor from 'mui-rte'
import DoneIcon from '@mui/icons-material/Done'
import { EditorState } from 'draft-js'

<MUIRichTextEditor
    controls={["my-callback"]}
    customControls={[
        {
            name: "my-callback",
            icon: <DoneIcon />,
            type: "callback",
            onClick: (editorState, name, anchor) => {
                console.log(`Clicked ${name} control`)
                return EditorState.createEmpty()
            }
        }
    ]}
/>