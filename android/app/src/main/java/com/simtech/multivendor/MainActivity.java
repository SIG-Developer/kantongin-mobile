package com.simtech.multivendor;
import android.content.Intent;

import android.view.Gravity;
import android.graphics.Color;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    
    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }

    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);

        view.setGravity(Gravity.CENTER);
        view.setBackgroundColor(Color.parseColor("#ffffff"));

        ImageView imageView = new ImageView(this);
        imageView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
        imageView.setImageResource(R.drawable.splash);
        view.addView(imageView);
        return view;
    }
}
