import { useMemo } from "react"
import { useTranslation } from "react-i18next"
// import { useLocation, useNavigation } from "react-router-dom"
// import { getBaseUrl } from "utils"

const useEditor = () => {
  // const imageUploadBasePath = getBaseUrl()
  const {
    i18n: { language },
  } = useTranslation()
  // const imageUploadBasePath = (() => {
  //   let locationInfo = window.location
  //   const { hostname } = locationInfo
  //   if (hostname == "localhost" || hostname == "127.0.0.1") {
  //     return "https://global3.hanbiro.com"
  //   } else {
  //     if (window.location != window.parent.location) {
  //       locationInfo = window.parent.location
  //     }
  //     const { hostname, protocol, pathname } = locationInfo
  //     let apiUrl = [protocol, "//", hostname].join("")
  //     return apiUrl
  //   }
  // })()
  const supportImageTypes =
    "jpeg,JPEG,jpg,JPG,jpe,JPE,jfi,jif,jfif,png,PNG,gif,GIF,bmp,BMP,webp,WEBP"
  const fontfamily = useMemo(() => {
    const baseFonts =
      "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats;"
    const localeFonts = {
      ko:
        "맑은고딕=Malgun Gothic;" +
        '돋움="돋움",Dotum;' +
        '돋움체="돋움체",DotumChe;' +
        '굴림="굴림",Gulim;' +
        '굴림체="굴림체",GulimChe;' +
        '바탕="바탕",Batang;' +
        '바탕체="바탕체",BatangChe;' +
        '궁서="궁서",Gungseo;',
      en:
        "MS PGothic=MS PGothic,Sans-serif;" +
        "Meiryo UI=Meiryo UI,Sans-serif;" +
        "HiraKakuProN-W3=HiraKakuProN-W3;" +
        "MS PMincho=MS PMincho,Sans-serif;" +
        "MS Gothic=MS Gothic,Sans-serif;" +
        "MS Mincho=MS Mincho,Sans-serif;",
      ch: "Microsoft YaHei=Microsoft YaHei,Sans-serif;",
    }
    return localeFonts[language] + baseFonts
  }, [language])
  // const imageUploadUrl = (() => {
  //   let locationInfo = window.location
  //   const { hostname } = locationInfo
  //   if (hostname == "localhost" || hostname == "127.0.0.1") {
  //     // return `${imageUploadBasePath}/wyvernp2506/bootstrap-web/app/lib/tinymce/plugins/jbimages/ci/index.php?upload/dropupload`
  //     return `${imageUploadBasePath}/anhduy/bootstrap-web/app/lib/tinymce/plugins/jbimages/ci/index.php?upload/dropupload`
  //   } else {
  //     return `${imageUploadBasePath}/ngw/app/lib/tinymce/plugins/jbimages/ci/index.php?upload/dropupload`
  //   }
  // })()
  const defaultPlugins =
    "checklist lists link image table code codesample insertdatetime emoticons fullscreen wordcount  "
  const defaultToolbar =
    "fontfamily fontsize styles | align  lineheight checklist | bold italic underline | forecolor backcolor | bullist numlist | link image table | code codesample | insertdatetime emoticons | fullscreen | removeformat | print"
  // const filePickerHandle = function (cb, value, meta) {
  //   var input = document.createElement("input")
  //   input.setAttribute("type", "file")
  //   input.setAttribute("accept", "image/*")

  //   input.onchange = function () {
  //     var file = this.files[0]

  //     var reader = new FileReader()
  //     reader.onload = function () {
  //       var id = "blobid" + new Date().getTime()
  //       var blobCache = tinymce.activeEditor.editorUpload.blobCache
  //       var base64 = reader.result.split(",")[1]
  //       var blobInfo = blobCache.create(id, file, base64)
  //       blobCache.add(blobInfo)

  //       /* call the callback and populate the Title field with the file name */
  //       cb(blobInfo.blobUri(), { title: file.name })
  //     }
  //     reader.readAsDataURL(file)
  //   }

  //   input.click()
  // }
  return {
    defaultPlugins,
    defaultToolbar,
    // imageUploadBasePath,
    // imageUploadUrl,
    // filePickerHandle,
    supportImageTypes,
    fontfamily,
  }
}

export default useEditor
