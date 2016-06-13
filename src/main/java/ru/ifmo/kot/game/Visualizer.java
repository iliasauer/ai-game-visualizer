package ru.ifmo.kot.game;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

public class Visualizer {

  private static final int DEFAULT_PORT = 8090;
  private static final String WEBAPP_DIR_LOCATION =
          "src/main/webapp/";
  private static final String WEBXML_LOCATION =
          WEBAPP_DIR_LOCATION + "WEB-INF/web.xml";
  private static final String CONTEXT_PATH = "/";

  public static void main(String[] args) throws Exception {
    final Server server = new Server(DEFAULT_PORT);

    WebAppContext ctx = new WebAppContext();
    ctx.setContextPath(CONTEXT_PATH);
    ctx.setDescriptor(WEBXML_LOCATION);
    ctx.setResourceBase(WEBAPP_DIR_LOCATION);
    ctx.setParentLoaderPriority(true);

    server.setHandler(ctx);

    server.start();
    server.join();
  }

}
