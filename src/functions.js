import store from "./store";
import router from "./router";
import axios from "axios";

const links = {
    pdf: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/pdf_opt_p5fh0g.png',
    word: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/word_opt_dlfjsr.png',
    other: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/other_opt_blxamk.png',
    image: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/image_opt_ejbolh.png',
    excel: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/excel_opt_kmuzhr.png',
    powerPoint: 'https://res.cloudinary.com/cloud4files/image/upload/v1606182071/iconos%20reducidos/powerPoint_opt_ckbzoc.png',
    compressed: 'https://res.cloudinary.com/cloud4files/image/upload/v1607301993/zip_tu1ki8.png',
    video: 'https://res.cloudinary.com/cloud4files/image/upload/v1607455867/video_s7p213.png',
    audio: 'https://res.cloudinary.com/cloud4files/image/upload/v1607459187/audio-file_xsze45.png',
};

const pagination = 8;



function getImgUrl (ext) {
    let image = links.other;
    if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'psd', 'ai', 'cdr', 'dwg',
      'svg', 'raw', 'net'].includes(ext)) {
      image = links.image;
    } else if (['pdf'].includes(ext)){
      image = links.pdf;
    } else if (['doc', 'docx', 'dotm', 'dotx', 'docm'].includes(ext)){
      image = links.word;
    } else if (['xlsx', 'xls', 'xlsm', 'xlsb', 'xltx'].includes(ext)){
      image = links.excel;
    } else if (['rar', 'zip'].includes(ext)){
      image = links.compressed;
    } else if (['pptx', 'pptm', 'ppt', 'pdf'].includes(ext)){
      image = links.powerPoint;
    } else if (['mp4', 'MKV', 'asf', 'QT', 'QTL', 'avi', 'mov', 'MPEG',
      'MPG', 'WebM', 'FLV ', 'SWF', 'wmv', 'asf', 'VOB', 'DVD', 'rpm'].includes(ext)){
      image = links.video;
    } else if (['mp3', 'mid ', 'midi', 'wav', 'wma', 'cda', 'ogg',
      'ogm', 'aac', 'ac3', 'flac', 'aym'].includes(ext)){
      image = links.audio;
    }
    return image;
}

async function setFiles (projectId) {
  var access_token = store.getters.user.token;
  let res = await axios.post('files-project/', {
      "project": projectId,
      "pagination": pagination
    }, {
    headers: {
      'Authorization': `token ${access_token}` 
    }
  });
  var files = res.data.results;
  var lengthPage = Math.round(res.data.count/pagination) + 1;
  return (files, lengthPage);
}

async function uploadFiles(files){
  let currentUrl = window.location.href;
  let url_ = new URL(currentUrl);
  let projectId = url_.searchParams.get("project");
  let nameProject = url_.searchParams.get("n");

  if (projectId){
    let access_token = store.state.auth.user.token;
    var formData = new FormData();
    formData.append("project", projectId);

    for (let i = 0; i < files.length; i++){
      formData.append("document", files[i]);
      let res = await axios.post('files/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `token ${access_token}`
        }
      });
    }
    setFiles(projectId);
  }
}


export { getImgUrl, links, setFiles, uploadFiles, pagination };

