import { Editor } from "@tinymce/tinymce-react"
import { forwardRef, useRef } from "react"
import useEditor from "./useEditor"
function HanEditorComponent(
  {
    readonly,
    value,
    onChange,
    options = {},
    editorAttributes = {},
    parentClass = "",
  },
  ref
) {
  const editorRef = useRef(null)
  const handleEditorChange = value => {
    if (onChange) {
      onChange(value)
    }
  }
  const {
    fontfamily,
    // imageUploadUrl,
    defaultPlugins,
    defaultToolbar,
    // imageUploadBasePath,
    supportImageTypes,
    // filePickerHandle,
  } = useEditor()
  return (
    <div className={`${parentClass}`}>
      <Editor
        disabled={readonly}
        onEditorChange={handleEditorChange}
        onInit={(evt, editor) => {
          editorRef.current = editor
          if (ref) {
            ref.current = editor
          }
        }}
        value={value}
        plugins={defaultPlugins}
        init={{
          skin: "tinymce-5",
          promotion: false,
          branding: false,
          elementpath: false,
          height: 500,
          statusbar: !readonly,
          menubar: !readonly,
          verify_html: true,
          toolbar1: readonly ? "" : defaultToolbar,
          // images_upload_base_path: imageUploadBasePath,
          // images_upload_url: imageUploadUrl,
          images_upload_credentials: true,
          automatic_uploads: true,
          images_file_types: supportImageTypes,
          font_family_formats: fontfamily,
          paste_data_images: true,
          a11y_advanced_options: true,
          image_advtab: true,
          file_picker_types: "file image media",
          // file_picker_callback: filePickerHandle,
          extended_valid_elements: "script[src|async|defer|type|charset]",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          ...options,
        }}
        {...editorAttributes}
      />
    </div>
  )
}
const HanEditor = forwardRef(HanEditorComponent)
export default HanEditor

