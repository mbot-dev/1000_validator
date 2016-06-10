package jp.or.ehr.mml;

import java.io.IOException;
import java.io.StringReader;
import java.net.URL;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.XMLConstants;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;

import org.xml.sax.SAXException;

import com.ibm.json.java.JSONObject;

@ApplicationPath("api")
@Path("v1")
public class ValidatorResource extends javax.ws.rs.core.Application {

	private static Schema schema;
	static {
		try {
			URL url = ValidatorResource.class.getResource("/WEB-INF/lib/schema/mml.xsd");
			SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
			schema = schemaFactory.newSchema(url);
		} catch (SAXException ex) {
			ex.printStackTrace(System.err);
		}
	}

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String getGreetings() {
		return "1000 years validator is working!";
	}

	@PUT
	@Consumes(MediaType.APPLICATION_XML)
	@Produces(MediaType.APPLICATION_JSON)
	public Response putXml(String content) {

		JSONObject result = null;

		try {
			Source xmlFile = new StreamSource(new StringReader(content));
			Validator validator = schema.newValidator();
			
			validator.validate(xmlFile);
			result = createResult("valid", null);
			return Response.ok(result).build();
			
		} catch (SAXException e) {
			result = createResult("NOT valid", e.getLocalizedMessage());
			return Response.ok(result).build();
			
		} catch (IOException ex) {
			ex.printStackTrace(System.err);
			return Response.status(500).build();
		}
	}

	private JSONObject createResult(String result, String reason) {
		JSONObject json = new JSONObject();
		json.put("result", result);
		if (reason != null) {
			json.put("reason", reason);
		}
		try {
			json.serialize(System.err);
		} catch (IOException e1) {
			e1.printStackTrace();
		}

		return json;
	}
}