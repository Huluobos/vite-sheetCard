import { Request } from '@/util/request';
import exam from "@/router/modules/exam";

// @ts-ignore
const {VITE_GLOB_API_URL} = process.env


/**
 * 获取所有科目
 * @param examId
 */
export function getAllSubjectsApi(examId: string) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/analysis/getAllSubjects',
    method: 'get',
    params: {
      examId: examId
    },
  })
}
/**
 * 分数段 名次段 百分比段 查询
 * @param data
 */
export function getScoreSegmentResultApi(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/analysis/getScoreSegmentResult',
    method: 'get',
    params: data,
  })
}

export function getManyRate(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/analysis/manyRate',
    method: 'post',
    params: data,
  })
}
export function saveAllThreeRateSetting(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/analysis/saveAllThreeRateSetting',
    method: 'post',
    data,
  })
}

/**
 * 分数段 名次段 百分比段 设置查询
 * @param data
 */
export function getSchoolAllSubSegmentApi(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/analysis/schoolAllSubSegment',
    method: 'get',
    params: data,
  })
}

/**
 * 获取过滤学生
 * @param data
 */
export function findFilterStudent(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/student/listFilterStudent',
    method: 'post',
    params: data,
  })
}


/**
 * 添加过滤学生
 * @param data
 */
export function addFilterStudent(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/student/addFilterStudent',
    method: 'post',
    data
  })
}


/**
 * 删除
 * @param data
 */
export function deleteFilterStudent(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/student/deleteFilterStudent',
    method: 'post',
    params: data,
  })
}


/**
 * 下载模板
 * @param data
 */
export function downloadTemp() {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/student/downloadTemp',
    method: 'post',
    responseType: 'blob'
  })
}

/**
 * 获取等级设置
 * @param data
 */
export function gradeScoreJunior(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/level/gradeScoreJunior',
    method: 'post',
    data
  })
}

/**
 * 获取等级设置
 * @param data
 */
export function saveGradeScoreJunior(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/level/saveGrade',
    method: 'post',
    data
  })
}

export function saveAnotherSubSet(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/level/saveAnotherSubSet',
    method: 'post',
    data
  })
}

/**
 * 删除单个配置
 * @param data
 */
export function deleteSegmentApi(segmentId: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/analysis/deleteSegment',
    method: 'post',
    params: {segmentId: segmentId},
  })
}


/**
 * 添加 赋分设置
 * @param data
 */
export function saveGradeScoreSet(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreSet/addSd',
    method: 'post',
    data
  })
}

/**
 * 获取 赋分设置
 * @param data
 */
export function queryGradeScoreSet(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/scoreSet/getScoreSet',
    method: 'post',
    data
  })
}

/**
 * 删除所有配置
 * @param data
 */
export function deleteAllShareSegmentApi(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/analysis/deleteAllShareSegment',
    method: 'post',
    params: data,
  })
}

/**
 * 设置默认指标
 * @param data
 */
export function setDefaultSegmentApi(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/analysis/defaultSegment',
    method: 'post',
    params: data,
  })
}

/**
 * 设置默认指标
 * @param data
 */
export function saveSegmentApi(examId:any, data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/analysis/saveSegment?examId='+examId,
    method: 'post',
    data: data,
  })
}

/**
 * 按科目查找试卷分析结果
 * @param data
 */
export function findPaperResultApi(data: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/situation/findPaperResult',
    method: 'get',
    params: data,
  })
}

/**
 * 导出一分多率
 * @param query
 */
export function exportManyRate(query: any) {
  return Request.axiosInstance({
    url: VITE_GLOB_API_URL + '/newexam/analysis/exportManyRate',
    method: 'post',
    params: query,
    responseType: 'blob'
  })
}
