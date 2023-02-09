import {Request} from '@/util/request';

const {VITE_GLOB_API_URL} = process.env

export function scoreSchoolSurvey(query: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/scoreSchoolSurvey',
    params: {
      examId: query.examId,
      subId: query.subId,
      schoolId: query.schoolId,
    },
  })
}


export function checkScore(query: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/checkScore',
    method: 'post',
    params: {
      examId: query.examId,
      subId: query.subId,
      schoolId: query.schoolId,
      checkType: query.checkType,
    },
  })
}
export function findNewExamScore(query: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/findNewExamScore',
    method: 'post',
    params: {
      examId: query.examId,
      subId: query.subId,
      subName: query.subName,
      schoolId: query.schoolId,
      page: query.page,
      size: query.limit,
      param: query.param,
    },
  })
}
export function getQuestionBySubjectName(query: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/getQuestionBySubjectName',
    method: 'post',
    params: {
      examId: query.examId,
      subId: query.subId,
    },
  })
}
export function getStudentDetail(query: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/getStudentDetail',
    method: 'post',
    params: query,
  })
}
export function getMergeSubBySub(query: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/getMergeSubBySub',
    method: 'post',
    params: {
      examId: query.examId,
      subId: query.subId
    },
  })
}


export function studentDetailExport(query: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/excelExport/studentDetail',
    method: 'post',
    params: query,
    responseType: 'blob'
  })
}

export function studentDetailInfo(examId: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/situation/excelExport/studentDetailInfo',
    method: 'post',
    params: {
      examId: examId
    },
    responseType: 'blob'
  })
}

export function addStudScore(query: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/addStudScore',
    method: 'post',
    params: {
      examId:query.examId,
      subId:query.subId,
      examNo:query.changeExamNo,
      score:query.changeStudentScore
    }
  })
}
export function cancelReleaseApi(subId: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/cancelRelease',
    method: 'post',
    params: {
      subId:subId
    }
  })
}
export function studentScoreExport(query: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/excelExport/studentScore',
    method: 'post',
    params: query,
    responseType: 'blob'
  })
}

export function listAllExamScoreTaskApi(data:any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/getExamScoreTaskList',
    method: 'post',
    data,
  })
}

export function getExamScoreTaskByIdApi(data:any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/getExamScoreTaskInfo',
    method: 'get',
    params: data,
  })
}

export function scoreSchoolSurveyReportApi(data:any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/scoreSchoolSurveyReport',
    method: 'get',
    params: data,
  })
}

export function studentScoreSearchApi(data:any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/studentScore/search',
    method: 'post',
    params:{examId: data.examId},
    data,
  })
}

export function scoreReportExportApi(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/excelExport/subAllInfo',
    data,
    method: 'post',
    responseType: 'blob'
  })
}

export function scoreReportExportAllSubApi(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/excelExport/allSubInfo',
    data,
    method: 'post',
    responseType: 'blob'
  })
}

export function tableSearchApi(data: any, examId: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/score/table/search',
    data,
    method: 'post',
    params: {
      examId: examId
    }
  })
}

export function exportOneScoreOneSegmentApi(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/exportOneScoreOneSegment',
    params: data,
    method: 'get',
    responseType: 'blob'
  })
}

export function exportSubjectClassApi(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreManage/exportSubjectClass',
    params: data,
    method: 'get',
    responseType: 'blob'
  })
}
