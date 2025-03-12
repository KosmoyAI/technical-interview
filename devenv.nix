{ pkgs, config, ... }: {
  name = "Simple typescript pnpm project";
  infoSections = { biepboop = [ ''Simple typescript pnpm project'' ]; };

  dotenv.enable = true;

  languages = {
    javascript = {
      package = pkgs.nodejs-slim_22;
      enable = true;
      corepack.enable = true;
    };
    typescript.enable = true;
    java.enable = true;
  };

  pre-commit = {
    settings = {
      # eslint = {
      #   fix = true;#???
      #   extensions = "\.js$";#???
      # };
    };
    hooks = {
      nixpkgs-fmt.enable = true;
      # eslint.enable = true;
      # prettier.enable = true;
      # eclint.enable = true;
      # editorconfig-checker.enable = true;
    };
  };

  enterShell = ''
    #    pnpm i
        echo 'Biep Boop'
  '';

  scripts.biepboop.exec = ''
    echo "Bro how it goin"
  '';

  processes = {
    biepboop.exec = "pnpm build && pnpm preview";
  };
}
