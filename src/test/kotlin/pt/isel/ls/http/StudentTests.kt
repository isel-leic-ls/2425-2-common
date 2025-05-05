package pt.isel.ls.http

import kotlinx.serialization.json.Json
import org.http4k.core.Method.GET
import org.http4k.core.Method.POST
import org.http4k.core.Request
import org.http4k.core.Status
import org.http4k.routing.bind
import org.http4k.routing.routes
import kotlin.test.Test
import kotlin.test.assertEquals

class StudentTests {
    @Test
    fun get_student_with_number_10() {
        val app =
            routes(
                "students" bind GET to ::getStudents,
                "students/{number}" bind GET to ::getStudent,
                "students" bind POST to ::postStudent,
            )

        val response =
            app(
                Request(GET, "/students/10"),
            )
        assertEquals(response.status, Status.OK)
        val std = Json.decodeFromString<Student>(response.bodyString())
        assertEquals(Student("Filipe", 10), std)
    }
}
